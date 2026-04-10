import React, { useState, useEffect, memo } from 'react';
import { blogPosts } from '../data/blogPosts';
import styles from '../styles/Blog.module.css';

const allTags = ['All', ...new Set(blogPosts.flatMap((p) => p.tags))];

function BlogWindow() {
  const [activeTag, setActiveTag] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [view, setView] = useState('tags'); // 'tags', 'list', 'post'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredPosts = activeTag === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.tags.includes(activeTag));

  const handleBack = () => {
    if (view === 'post') setView('list');
    else if (view === 'list') setView('tags');
    setSelectedPost(null);
  };

  const renderTags = () => (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLabel}>Tags</div>
      {allTags.map((tag) => (
        <button
          key={tag}
          className={`${styles.tagBtn} ${activeTag === tag ? styles.tagBtnActive : ''}`}
          onClick={() => { 
            setActiveTag(tag); 
            setSelectedPost(null); 
            if (isMobile) setView('list');
          }}
        >
          {tag}
        </button>
      ))}
      <div className={styles.clickHint}>Click on any to know more about them</div>
    </div>
  );

  const renderContent = () => (
    <div className={styles.content}>
      {selectedPost ? (
        <PostView 
          post={selectedPost} 
          onBack={() => {
            if (isMobile) setView('list');
            setSelectedPost(null);
          }} 
          isMobile={isMobile} 
        />
      ) : (
        <PostList 
          posts={filteredPosts} 
          onSelect={(post) => {
            setSelectedPost(post);
            if (isMobile) setView('post');
          }} 
          onBack={() => setView('tags')}
          isMobile={isMobile}
          activeTag={activeTag}
        />
      )}
    </div>
  );

  if (!isMobile) {
    return (
      <div className={styles.blog}>
        {renderTags()}
        {renderContent()}
      </div>
    );
  }

  return (
    <div className={styles.blog}>
      {view === 'tags' && renderTags()}
      {view === 'list' && renderContent()}
      {view === 'post' && renderContent()}
    </div>
  );
}

function PostList({ posts, onSelect, onBack, isMobile, activeTag }) {
  return (
    <div className={styles.postListWrapper}>
      {isMobile && (
        <button className={styles.mobileBackBtn} onClick={onBack}>
          ← Back to Tags ({activeTag})
        </button>
      )}
      {posts.map((post) => (
        <div
          key={post.id}
          className={styles.postItem}
          onClick={() => onSelect(post)}
        >
          <div className={styles.postTitle}>{post.title}</div>
          <div className={styles.postMeta}>
            {post.date} • {post.readTime}
            {post.tags.map((t) => (
              <span key={t} className={styles.postTag}>{t}</span>
            ))}
          </div>
          <div className={styles.postExcerpt}>{post.excerpt}</div>
        </div>
      ))}
      <div className={styles.clickHint}>Click on any to know more about them</div>
    </div>
  );
}

function PostView({ post, onBack, isMobile }) {
  return (
    <div className={styles.postView}>
      <button className={styles.backBtn} onClick={onBack}>
        {isMobile ? `← Back to list` : '← All posts'}
      </button>
      <h1 className={styles.postViewTitle}>{post.title}</h1>
      <div className={styles.postViewMeta}>
        {post.date} • {post.readTime}
        {post.tags.map((t) => (
          <span key={t} className={styles.postTag}>{t}</span>
        ))}
      </div>
      <div
        className={styles.postViewContent}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export default memo(BlogWindow);
