import React, { useState, memo } from 'react';
import { blogPosts } from '../data/blogPosts';
import styles from '../styles/Blog.module.css';

const allTags = ['All', ...new Set(blogPosts.flatMap((p) => p.tags))];

function BlogWindow() {
  const [activeTag, setActiveTag] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = activeTag === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.tags.includes(activeTag));

  const handleBack = () => setSelectedPost(null);

  return (
    <div className={styles.blog}>
      {/* Tag sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarLabel}>Tags</div>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagBtn} ${activeTag === tag ? styles.tagBtnActive : ''}`}
            onClick={() => { setActiveTag(tag); setSelectedPost(null); }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {selectedPost ? (
          <PostView post={selectedPost} onBack={handleBack} />
        ) : (
          <PostList posts={filteredPosts} onSelect={setSelectedPost} />
        )}
      </div>
    </div>
  );
}

function PostList({ posts, onSelect }) {
  return (
    <div>
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
    </div>
  );
}

function PostView({ post, onBack }) {
  return (
    <div className={styles.postView}>
      <button className={styles.backBtn} onClick={onBack}>
        ← All posts
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
