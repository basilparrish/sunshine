import React, { useState } from 'react';
import './CollapsiblePost.css';

// Dynamically load all files from the attachments directory
const fileContext = require.context('../data/attachments', false, /\.(jpg|jpeg|png|gif|mp4|webm|ogg|pdf|docx|txt)$/);
const fileMap = fileContext.keys().reduce((map, filePath) => {
  const fileName = filePath.replace('./', ''); // Remove './' from the file path
  map[fileName] = fileContext(filePath);
  return map;
}, {});

function CollapsiblePost({ title, subtitle, date, content, files = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalFile, setModalFile] = useState(null);
  const [externalLink, setExternalLink] = useState(null);

  const openModal = (file) => setModalFile(file);
  const closeModal = () => setModalFile(null);

  const getFileSrc = (file) => {
    if (file.startsWith('http')) {
      return file; // Return the URL directly for external links
    }
    const src = fileMap[file];
    if (!src) {
      console.error(`File not found in fileMap: ${file}`);
    }
    return src || null;
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const renderFilePreview = (file) => {
    const isImage = file.match(/\.(jpg|jpeg|png|gif)$/i);
    const isVideo = file.match(/\.(mp4|webm|ogg)$/i);
    const isDoc = file.match(/\.(pdf|docx|txt)$/i);
    const isYouTube = file.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/i);
    const isExternal = file.startsWith('http') && !isYouTube;

    const src = getFileSrc(file);

    if (!src) return null; // Do not render anything if the file is not found

    if (isImage) {
      return (
        <img
          src={src}
          alt="File preview"
          className="file-preview"
          onClick={() => openModal(file)}
        />
      );
    } else if (isVideo) {
      return (
        <video
          src={src}
          className="file-preview"
          onClick={() => openModal(file)}
          muted
        />
      );
    } else if (isYouTube) {
      return (
        <img
          src={getYouTubeThumbnail(file)}
          alt="YouTube Thumbnail"
          className="file-preview youtube-thumbnail"
          onClick={() => openModal(file)}
        />
      );
    } else if (isExternal) {
      const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${file}`;
      return (
        <img
          src={favicon}
          alt="Website Favicon"
          className="file-preview external-favicon"
          onClick={() => setExternalLink(file)}
        />
      );
    } else if (isDoc) {
      return (
        <div
          className="file-preview doc-preview"
          onClick={() => openModal(file)}
        >
          <p>{file}</p>
        </div>
      );
    }
    return null;
  };

  const handleExternalLink = (choice) => {
    if (choice === 'yes') {
      window.open(externalLink, '_blank');
    }
    setExternalLink(null);
  };

  return (
    <div className="collapsible-post">
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>
      <p className="date">{date}</p>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      {isExpanded && (
        <div className="post-details">
          <p>{content}</p>
          {files.length > 0 && (
            <>
              <hr className="file-divider" />
              <div className="file-gallery">
                {files.map((file, index) => (
                  <div key={index} className="file-container">
                    {renderFilePreview(file)}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {modalFile && (
        <div className="file-modal" onClick={closeModal}>
          <div className="modal-content no-background" onClick={(e) => e.stopPropagation()}>
            {modalFile.match(/\.(jpg|jpeg|png|gif)$/i) && (
              <img src={getFileSrc(modalFile)} alt="Full view" />
            )}
            {modalFile.match(/\.(mp4|webm|ogg)$/i) && (
              <video src={getFileSrc(modalFile)} controls autoPlay />
            )}
            {modalFile.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/i) && (
              <iframe
                src={modalFile.replace('watch?v=', 'embed/')}
                title="YouTube Video"
                className="youtube-modal"
              />
            )}
            {modalFile.match(/\.(pdf|docx|txt)$/i) && (
              <iframe
                src={getFileSrc(modalFile)}
                title="Document Viewer"
                className="doc-viewer"
              />
            )}
          </div>
        </div>
      )}
      {externalLink && (
        <div className="external-link-popup">
          <p>Do you want to leave this website?</p>
          <button onClick={() => handleExternalLink('yes')}>Yes</button>
          <button onClick={() => handleExternalLink('no')}>No</button>
        </div>
      )}
    </div>
  );
}

export default CollapsiblePost;
