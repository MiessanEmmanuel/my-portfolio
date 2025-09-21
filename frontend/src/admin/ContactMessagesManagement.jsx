import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Button from '../components/Button';
import { adminService } from '../services/adminService';
import {
  Search,
  Filter,
  Mail,
  MailOpen,
  Trash2,
  Eye,
  Calendar,
  User,
  Building,
  MessageSquare,
  Clock,
  Loader,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ContactMessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, read, unread
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getContactMessages();
      setMessages(response.data || response);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await adminService.markMessageAsRead(id);
      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await adminService.deleteContactMessage(id);
      setMessages(messages.filter(msg => msg.id !== id));
      setDeleteConfirm(null);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      await handleMarkAsRead(message.id);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'read' && message.is_read) ||
      (filterStatus === 'unread' && !message.is_read);

    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  const MessageItem = ({ message }) => (
    <div
      className={`p-4 border border-border dark:border-border rounded-lg cursor-pointer hover:shadow-md transition-smooth ${!message.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-surface-dark'
        }`}
      onClick={() => handleViewMessage(message)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {message.is_read ? (
              <MailOpen className="text-gray-400" size={16} />
            ) : (
              <Mail className="text-primary" size={16} />
            )}
            <span className={`font-medium ${!message.is_read ? 'text-text-primary dark:text-text-dark' : 'text-text-secondary dark:text-text-light'}`}>
              {message.name}
            </span>
            {message.company && (
              <>
                <span className="text-text-light">•</span>
                <span className="text-sm text-text-secondary dark:text-text-light">
                  {message.company}
                </span>
              </>
            )}
          </div>

          <h3 className={`text-lg mb-2 ${!message.is_read ? 'font-semibold text-text-primary dark:text-text-dark' : 'text-text-secondary dark:text-text-light'}`}>
            {message.subject}
          </h3>

          <p className="text-text-secondary dark:text-text-light text-sm mb-3 line-clamp-2">
            {message.message}
          </p>

          <div className="flex items-center gap-4 text-xs text-text-light">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(message.created_at).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{new Date(message.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {message.budget && (
              <div className="flex items-center gap-1">
                <span>Budget: {message.budget}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirm(message.id);
            }}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-smooth"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const MessageDetail = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-surface-dark rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark">
              Détails du message
            </h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* Sender Info */}
            <div className="bg-gray-50 dark:bg-background-dark rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-text-secondary dark:text-text-light">Nom</label>
                  <p className="font-medium text-text-primary dark:text-text-dark">{message.name}</p>
                </div>
                <div>
                  <label className="text-sm text-text-secondary dark:text-text-light">Email</label>
                  <p className="font-medium text-text-primary dark:text-text-dark">{message.email}</p>
                </div>
                {message.company && (
                  <div>
                    <label className="text-sm text-text-secondary dark:text-text-light">Entreprise</label>
                    <p className="font-medium text-text-primary dark:text-text-dark">{message.company}</p>
                  </div>
                )}
                {message.budget && (
                  <div>
                    <label className="text-sm text-text-secondary dark:text-text-light">Budget</label>
                    <p className="font-medium text-text-primary dark:text-text-dark">{message.budget}</p>
                  </div>
                )}
                {message.timeline && (
                  <div>
                    <label className="text-sm text-text-secondary dark:text-text-light">Délai</label>
                    <p className="font-medium text-text-primary dark:text-text-dark">{message.timeline}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-text-secondary dark:text-text-light">Date</label>
                  <p className="font-medium text-text-primary dark:text-text-dark">
                    {new Date(message.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm text-text-secondary dark:text-text-light">Sujet</label>
              <p className="text-lg font-medium text-text-primary dark:text-text-dark mt-1">{message.subject}</p>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-text-secondary dark:text-text-light">Message</label>
              <div className="mt-2 p-4 bg-gray-50 dark:bg-background-dark rounded-lg">
                <p className="text-text-primary dark:text-text-dark whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border dark:border-border">
              <a
                href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                className="flex-1"
              >
                <Button variant="gradient" className="w-full">
                  <Mail size={16} className="mr-2" />
                  Répondre par email
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(message.id)}
              >
                <Trash2 size={16} className="mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary dark:text-text-dark">
              Messages de contact
            </h1>
            <p className="text-text-secondary dark:text-text-light mt-1">
              Gérez les messages reçus via le formulaire de contact
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-border">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher dans les messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth bg-white dark:bg-background-dark text-text-primary dark:text-text-dark"
              >
                <option value="all">Tous les messages</option>
                <option value="unread">Non lus</option>
                <option value="read">Lus</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin h-8 w-8 text-primary" />
            <span className="ml-2 text-text-secondary">Chargement des messages...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700">{error}</p>
            <Button variant="outline" size="sm" className="ml-auto" onClick={fetchMessages}>
              Réessayer
            </Button>
          </div>
        )}

        {/* Messages List */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary dark:text-text-light">
                {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} trouvé{filteredMessages.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-4">
              {filteredMessages.map(message => (
                <MessageItem key={message.id} message={message} />
              ))}
            </div>

            {filteredMessages.length === 0 && messages.length > 0 && (
              <div className="text-center py-16">
                <MessageSquare className="mx-auto h-12 w-12 text-text-light mb-4" />
                <p className="text-text-secondary dark:text-text-light text-lg">
                  Aucun message trouvé avec ces critères.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {messages.length === 0 && (
              <div className="text-center py-16">
                <MessageSquare className="mx-auto h-12 w-12 text-text-light mb-4" />
                <p className="text-text-secondary dark:text-text-light text-lg">
                  Aucun message reçu pour le moment.
                </p>
              </div>
            )}
          </>
        )}

        {/* Message Detail Modal */}
        {selectedMessage && (
          <MessageDetail
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark mb-4">
                Confirmer la suppression
              </h3>
              <p className="text-text-secondary dark:text-text-light mb-6">
                Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Annuler
                </Button>
                <Button
                  variant="gradient"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDeleteMessage(deleteConfirm)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContactMessagesManagement;