<script setup lang="ts">
// CTAComponent - Call to action section
</script>

<template>
  <section class="cta-section">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="cta-inner">
        <div class="cta-left">
          <div class="cta-badge">
            <span class="badge-dot"></span>
            <span class="badge-text">{{ $t('cta.badge') }}</span>
          </div>

          <h3 class="cta-title">
            {{ $t('cta.title').replace('ExpatJobs', '').trim() }} <span class="cta-gradient">EXPAT JOBS Go</span>
          </h3>

          <p class="cta-subtitle">
            {{ $t('cta.subtitle') }}
          </p>

          <div class="cta-buttons">
            <router-link to="/register?role=candidate" class="primary-btn">
              {{ $t('cta.searchJob') }}
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </router-link>
            <router-link to="/register?role=recruiter" class="secondary-btn">
              {{ $t('cta.wantToRecruit') }}
            </router-link>
          </div>

          <div class="cta-meta">
            <span>{{ $t('cta.freeSignup') }}</span>
            <span class="dot"></span>
            <span>{{ $t('cta.cancelAnytime') }}</span>
            <span class="dot"></span>
            <span>{{ $t('cta.dedicatedSupport') }}</span>
          </div>
        </div>

        <div class="cta-right">
          <div class="cta-card">
            <div class="cta-card-header">
              <span class="cta-chip">{{ $t('cta.realTime') }}</span>
              <span class="cta-chip cta-chip-secondary">{{ $t('cta.international') }}</span>
            </div>
            <div class="cta-card-main">
              <div class="cta-stat">
                <div class="cta-stat-value">16.8M+</div>
                <div class="cta-stat-label">Postes vacants</div>
              </div>
              <div class="cta-stat">
                <div class="cta-stat-value">146 M+</div>
                <div class="cta-stat-label">Applications</div>
              </div>
              <div class="cta-stat">
                <div class="cta-stat-value">736M</div>
                <div class="cta-stat-label">Demandes cv</div>
              </div>
            </div>
            <div class="cta-card-footer">
              <div class="cta-avatars">
                <span class="avatar-circle">AM</span>
                <span class="avatar-circle">JD</span>
                <span class="avatar-circle">LK</span>
                <span class="avatar-more">+120</span>
              </div>
              <p class="cta-card-text">
                {{ $t('cta.dailyJoiners') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 3rem 0;
  background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 50%, #a7f3d0 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 150%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.cta-inner {
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 1;
}

.cta-left {
  flex: 1.2;
}

.cta-right {
  flex: 1;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(16, 185, 129, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.cta-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 500px;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5);
}

.secondary-btn {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  color: #111827;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  border-color: #10b981;
  color: #10b981;
  transform: translateY(-2px);
}

.cta-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.cta-meta .dot {
  width: 4px;
  height: 4px;
  background: #d1d5db;
  border-radius: 50%;
}

.cta-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transform: rotate(2deg);
  transition: transform 0.3s ease;
}

.cta-card:hover {
  transform: rotate(0deg) scale(1.02);
}

.cta-card-header {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.cta-chip {
  padding: 0.375rem 0.875rem;
  background: #10b981;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cta-chip-secondary {
  background: #f3f4f6;
  color: #6b7280;
}

.cta-card-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.cta-stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.cta-stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.cta-card-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cta-avatars {
  display: flex;
  align-items: center;
}

.avatar-circle {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  margin-left: -0.75rem;
}

.avatar-circle:first-child {
  margin-left: 0;
}

.avatar-more {
  width: 2.5rem;
  height: 2.5rem;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  margin-left: -0.75rem;
}

.cta-card-text {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 1024px) {
  .cta-inner {
    flex-direction: column;
    gap: 3rem;
  }

  .cta-left, .cta-right {
    width: 100%;
    flex: none;
  }

  .cta-title {
    font-size: 2.25rem;
  }

  .cta-card {
    transform: rotate(0deg);
  }
}

@media (max-width: 640px) {
  .cta-section {
    padding: 3rem 0;
  }

  .cta-title {
    font-size: 1.75rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-card-main {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cta-meta {
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }

  .primary-btn, .secondary-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
