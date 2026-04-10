import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Contact.module.css';

function ContactWindow() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className={styles.contact}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.subtitle}>
        Send a message for project inquiries, collaborations, or just to say hello.
      </p>

      <div className={styles.fieldGroup}>
        <div>
          <div className={styles.label}>Name</div>
          <input
            className={styles.input}
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Your name"
          />
        </div>
        <div>
          <div className={styles.label}>Email</div>
          <input
            className={styles.input}
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <div className={styles.label}>Subject</div>
          <input
            className={styles.input}
            type="text"
            value={form.subject}
            onChange={handleChange('subject')}
            placeholder="Project inquiry"
          />
        </div>
        <div>
          <div className={styles.label}>Message</div>
          <textarea
            className={styles.textarea}
            value={form.message}
            onChange={handleChange('message')}
            placeholder="Tell me about your project..."
          />
        </div>

        <motion.button
          className={`${styles.sendBtn} ${sent ? styles.sendBtnSuccess : ''}`}
          onClick={handleSend}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {sent ? 'Message sent ✓' : 'Send message →'}
        </motion.button>
      </div>
    </div>
  );
}

export default memo(ContactWindow);
