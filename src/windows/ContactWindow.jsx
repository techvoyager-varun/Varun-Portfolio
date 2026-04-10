import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import styles from '../styles/Contact.module.css';

function ContactWindow() {
  const [state, handleSubmit] = useForm("mdaprple");

  if (state.succeeded) {
    return (
      <div className={styles.contact}>
        <div className={styles.successMessage}>
          <h1 className={styles.title}>Thanks for reaching out!</h1>
          <p className={styles.subtitle}>
            I've received your message and will get back to you soon at the email you provided.
          </p>
          <motion.button 
            className={styles.sendBtn}
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Send another message
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contact}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.subtitle}>
        Send a message for project inquiries, collaborations, or just to say hello.
      </p>

      <form onSubmit={handleSubmit} className={styles.fieldGroup}>
        <div>
          <div className={styles.label}>Name</div>
          <input
            id="name"
            name="name"
            className={styles.input}
            type="text"
            required
            placeholder="Your name"
          />
          <ValidationError 
            prefix="Name" 
            field="name"
            errors={state.errors}
            className={styles.errorMessage}
          />
        </div>
        <div>
          <div className={styles.label}>Email</div>
          <input
            id="email"
            name="email"
            className={styles.input}
            type="email"
            required
            placeholder="you@email.com"
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className={styles.errorMessage}
          />
        </div>
        <div>
          <div className={styles.label}>Subject</div>
          <input
            id="subject"
            name="subject"
            className={styles.input}
            type="text"
            placeholder="Project inquiry"
          />
          <ValidationError 
            prefix="Subject" 
            field="subject"
            errors={state.errors}
            className={styles.errorMessage}
          />
        </div>
        <div>
          <div className={styles.label}>Message</div>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            required
            placeholder="Tell me about your project..."
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
            className={styles.errorMessage}
          />
        </div>

        <motion.button
          type="submit"
          className={`${styles.sendBtn} ${state.submitting ? styles.sendBtnLoading : ''}`}
          disabled={state.submitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {state.submitting ? 'Sending...' : 'Send message →'}
        </motion.button>

        {state.errors && !state.errors.length && (
          <p className={styles.errorMessage}>Oops! Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}

export default memo(ContactWindow);
