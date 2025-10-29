<template>
  <article class="card-container group">
    <div class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="job-title">{{ offre.titre }}</h3>
          <div class="company-info">
            <div class="company-badge">
              <span class="company-name">{{ offre.entreprise }}</span>
              <div class="company-details">
                <span v-if="offre.companyInfo?.webSiteUrl" class="website-link">
                  <svg class="website-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                  {{ getDomainFromUrl(offre.companyInfo.webSiteUrl) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="salary-section">
          <span class="salary">{{ offre.salaire }}</span>
        </div>
      </div>
      
      <div v-if="offre.urgent" class="urgent-badge">
        <svg class="urgent-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        Urgent
      </div>
    </div>

    <div class="card-body">
      <div class="metadata-grid">
        <div class="metadata-item">
          <svg class="metadata-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span>{{ offre.typeContrat }}</span>
        </div>
        
        <div class="metadata-item">
          <svg class="metadata-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          </svg>
          <span>{{ offre.localisation }}</span>
        </div>
        
        <div v-if="offre.remote" class="metadata-item">
          <svg class="metadata-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Remote</span>
        </div>

        <div v-if="offre.experienceLevel" class="metadata-item">
          <svg class="metadata-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          <span>{{ formatExperience(offre.experienceLevel) }}</span>
        </div>
      </div>
      <div v-if="offre.secteur" class="sector-section">
        <div class="section-label">
          <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          Secteur d'activité
        </div>
        <div class="sector-tags">
          <span class="sector-tag">{{ offre.secteur }}</span>
        </div>
      </div>

      <div v-if="offre.description" class="description">
        <p class="description-text">{{ truncateDescription(offre.description) }}</p>
      </div>
    </div>

    <div class="card-footer">
      <div class="date-info">
        <span class="date-text">Publié {{ offre.datePublication }}</span>
      </div>
      
      <div class="actions">
        <button class="favorite-btn" title="Sauvegarder">
          <svg class="favorite-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        
        <a 
          v-if="offre.companyInfo?.webSiteUrl" 
          :href="offre.companyInfo.webSiteUrl" 
          target="_blank" 
          class="website-btn"
          title="Visiter le site web"
        >
          <svg class="website-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"/>
          </svg>
          Site
        </a>
        
        <router-link 
          :to="`/detail/jobs/${offre.id}`" 
          class="apply-btn"
          title="Postuler à cette offre"
        >
          <span>Postuler</span>
          <svg class="apply-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  offre: {
    type: Object,
    required: true,
  },
});

const truncateDescription = (description) => {
  return description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description;
};

const formatExperience = (level) => {
  const levels = {
    'JUNIOR': 'Junior',
    'MID_LEVEL': 'Intermédiaire',
    'SENIOR': 'Senior',
    'EXPERT': 'Expert'
  };
  return levels[level] || level;
};

const getDomainFromUrl = (url) => {
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const domain = new URL(fullUrl).hostname.replace('www.', '');
    return domain.length > 20 ? domain.substring(0, 20) + '...' : domain;
  } catch {
    return url.length > 20 ? url.substring(0, 20) + '...' : url;
  }
};

const navigateToJobDetail = (jobId) => {
  router.push(`/detail/jobs/${jobId}`);
};
</script>

<style scoped>
.card-container {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-container:hover {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.card-header {
  padding: 20px 20px 16px;
  border-bottom: 1px solid #f3f4f6;
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.title-section {
  flex: 1;
  min-width: 0;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.company-info {
  margin-bottom: 4px;
}

.company-badge {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.company-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
}

.company-details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.location {
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
}

.website-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: #059669;
  text-decoration: none;
  transition: color 0.2s ease;
  background-color: #f0fdf4;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #dcfce7;
}

.website-link:hover {
  color: #047857;
  background-color: #dcfce7;
}

.website-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.salary-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.salary {
  font-size: 1.1rem;
  font-weight: 700;
  color: #059669;
  white-space: nowrap;
}

.contract-type {
  font-size: 0.75rem;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.urgent-badge {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(to right, #ef4444, #f97316);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.urgent-icon {
  width: 12px;
  height: 12px;
}

.card-body {
  padding: 16px 20px;
}

.metadata-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #6b7280;
  background-color: #f8fafc;
  padding: 4px 8px;
  border-radius: 6px;
}

.metadata-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.sector-section {
  margin-bottom: 16px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.section-icon {
  width: 16px;
  height: 16px;
}

.sector-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sector-tag {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #a7f3d0;
}

.description {
  margin-top: 12px;
}

.description-text {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  padding: 16px 20px;
  background-color: #f9fafb;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-info {
  font-size: 0.75rem;
  color: #9ca3af;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favorite-btn {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.favorite-btn:hover {
  background-color: #fef2f2;
  color: #ef4444;
  border-color: #fecaca;
}

.favorite-icon {
  width: 16px;
  height: 16px;
}

.website-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f0fdf4;
  color: #059669;
  border: 1px solid #dcfce7;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.website-btn:hover {
  background: #dcfce7;
  color: #047857;
  transform: translateY(-1px);
}

.website-btn-icon {
  width: 14px;
  height: 14px;
}


.apply-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #059669;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}

.apply-btn:hover {
  background: #047857;
  transform: translateY(-1px);
  color: white;
  text-decoration: none;
}

.apply-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 640px) {
  .card-header {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .salary-section {
    align-items: flex-start;
  }
  
  .company-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  
  .card-body {
    padding: 12px 16px;
  }
  
  .card-footer {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .actions {
    justify-content: space-between;
  }
  
  .urgent-badge {
    position: static;
    align-self: flex-start;
    margin-bottom: 8px;
  }

  .metadata-grid {
    gap: 8px;
  }

  .metadata-item {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .actions {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  
  .website-btn, .apply-btn {
    flex: 1;
    justify-content: center;
    min-width: 80px;
  }
}
</style>