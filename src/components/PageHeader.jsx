import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ kicker, title, description, icon: Icon, badge }) {
  return (
    <div className="subpage-header">
      <div className="container subpage-header-container">
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{title}</span>
        </div>

        <div className="subpage-title-block">
          {kicker && (
            <div className="section-kicker">
              {Icon && <Icon size={15} className="inline-icon" />} {kicker}
            </div>
          )}
          <h1 className="subpage-h1">{title}</h1>
          {description && <p className="subpage-desc">{description}</p>}
          {badge && <div className="subpage-badge-row">{badge}</div>}
        </div>
      </div>
    </div>
  );
}
