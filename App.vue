<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { contact } from './locales.js'

const { t, tm, locale } = useI18n()

const langs = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
]

function setLang(code) {
  locale.value = code
  localStorage.setItem('cv-lang', code)
  document.documentElement.lang = code
}

function printCv() {
  window.print()
}

// tm() returns raw message objects/arrays for structured content.
const profile = computed(() => tm('profile'))
const expertise = computed(() => tm('expertise'))
const equipment = computed(() => tm('equipment'))
const experience = computed(() => tm('experience'))
const education = computed(() => tm('education'))
const langsList = computed(() => tm('langs'))

const initials = 'CG'
</script>

<template>
  <div class="page">
    <!-- Top bar: language + print -->
    <div class="toolbar no-print">
      <div class="lang-switch" role="group" :aria-label="t('ui.langName')">
        <button
          v-for="l in langs"
          :key="l.code"
          :class="['lang-btn', { active: locale === l.code }]"
          @click="setLang(l.code)"
        >{{ l.label }}</button>
      </div>
      <button class="print-btn" @click="printCv">{{ t('ui.print') }}</button>
    </div>

    <!-- Header -->
    <header class="header">
      <div class="avatar">{{ initials }}</div>
      <div class="head-text">
        <h1>{{ t('name') }}</h1>
        <p class="title">{{ t('title') }}</p>
        <p class="subtitle">{{ t('subtitle') }}</p>
        <p class="meta">{{ t('meta.citizenship') }}</p>
        <p class="meta">{{ t('meta.born') }}</p>
      </div>
    </header>

    <!-- Contact strip -->
    <div class="contact-strip">
      <a :href="`mailto:${contact.email}`">✉ {{ contact.email }}</a>
      <span>☎ {{ t('contactLabels.phoneES') }}: {{ contact.phoneES }}</span>
      <span>☎ {{ t('contactLabels.phoneBR') }}: {{ contact.phoneBR }}</span>
      <a :href="contact.linkedinUrl" target="_blank" rel="noopener">in/ {{ contact.linkedin }}</a>
      <a :href="contact.githubUrl" target="_blank" rel="noopener">⌥ {{ contact.github }}</a>
    </div>

    <main class="body">
      <div class="main-col">
        <!-- Profile -->
        <section>
          <h2>{{ t('ui.profile') }}</h2>
          <p v-for="(p, i) in profile" :key="i" class="para">{{ p }}</p>
        </section>

        <!-- Experience -->
        <section>
          <h2>{{ t('ui.experience') }}</h2>
          <div v-for="(job, i) in experience" :key="i" class="job">
            <div class="job-head">
              <h3>{{ job.role }}</h3>
              <span class="period">{{ job.period }}</span>
            </div>
            <p class="org">{{ job.org }} <span class="place">· {{ job.place }}</span></p>
            <ul>
              <li v-for="(pt, j) in job.points" :key="j">{{ pt }}</li>
            </ul>
          </div>
        </section>
      </div>

      <aside class="side-col">
        <!-- Expertise -->
        <section>
          <h2>{{ t('ui.expertise') }}</h2>
          <div v-for="(area, i) in expertise" :key="i" class="block">
            <h4>{{ area.h }}</h4>
            <ul>
              <li v-for="(it, j) in area.items" :key="j">{{ it }}</li>
            </ul>
          </div>
        </section>

        <!-- Equipment -->
        <section>
          <h2>{{ t('ui.equipment') }}</h2>
          <div v-for="(e, i) in equipment" :key="i" class="kv">
            <span class="k">{{ e.k }}</span>
            <span class="v">{{ e.v }}</span>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2>{{ t('ui.education') }}</h2>
          <ul class="edu">
            <li v-for="(ed, i) in education" :key="i">{{ ed }}</li>
          </ul>
        </section>

        <!-- Languages -->
        <section>
          <h2>{{ t('ui.languages') }}</h2>
          <div v-for="(lg, i) in langsList" :key="i" class="kv">
            <span class="k">{{ lg.name }}</span>
            <span class="v">{{ lg.level }}</span>
          </div>
        </section>
      </aside>
    </main>

    <footer class="foot">
      <span>© {{ new Date().getFullYear() }} {{ t('name') }}</span>
    </footer>
  </div>
</template>

<style>
:root {
  --ink: #1a2330;
  --muted: #5b6b7d;
  --accent: #1f5e8c;
  --accent-soft: #e8f0f6;
  --line: #dde4ec;
  --bg: #f4f6f9;
  --card: #ffffff;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
.page {
  max-width: 980px;
  margin: 24px auto;
  background: var(--card);
  box-shadow: 0 10px 40px rgba(20, 40, 70, .10);
  border-radius: 12px;
  overflow: hidden;
}
.toolbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 32px; background: var(--accent-soft); border-bottom: 1px solid var(--line);
}
.lang-switch { display: inline-flex; gap: 4px; background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 3px; }
.lang-btn {
  border: none; background: transparent; color: var(--muted);
  font-weight: 600; font-size: 13px; padding: 5px 12px; border-radius: 6px; cursor: pointer;
}
.lang-btn.active { background: var(--accent); color: #fff; }
.print-btn {
  border: 1px solid var(--accent); background: #fff; color: var(--accent);
  font-weight: 600; font-size: 13px; padding: 6px 14px; border-radius: 8px; cursor: pointer;
}
.print-btn:hover { background: var(--accent); color: #fff; }

.header {
  display: flex; gap: 24px; align-items: center;
  padding: 32px; background: linear-gradient(120deg, #1f5e8c 0%, #2b7bb0 100%); color: #fff;
}
.avatar {
  flex: 0 0 auto; width: 96px; height: 96px; border-radius: 50%;
  background: rgba(255,255,255,.16); border: 2px solid rgba(255,255,255,.5);
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; font-weight: 700; letter-spacing: 1px;
}
.head-text h1 { font-size: 30px; line-height: 1.15; }
.head-text .title { font-size: 17px; font-weight: 600; margin-top: 4px; }
.head-text .subtitle { font-size: 14px; opacity: .92; margin-bottom: 8px; }
.head-text .meta { font-size: 12.5px; opacity: .85; }

.contact-strip {
  display: flex; flex-wrap: wrap; gap: 8px 22px;
  padding: 12px 32px; background: #11283c; color: #cfe0ee; font-size: 12.5px;
}
.contact-strip a { color: #cfe0ee; text-decoration: none; }
.contact-strip a:hover { color: #fff; text-decoration: underline; }

.body { display: grid; grid-template-columns: 1.65fr 1fr; gap: 28px; padding: 32px; }
section { margin-bottom: 22px; }
h2 {
  font-size: 14px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--accent);
  border-bottom: 2px solid var(--line); padding-bottom: 6px; margin-bottom: 12px;
}
.para { margin-bottom: 10px; font-size: 13.5px; color: #33414f; }

.job { margin-bottom: 16px; padding-left: 14px; border-left: 2px solid var(--line); }
.job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.job h3 { font-size: 14.5px; color: var(--ink); }
.period { font-size: 12px; color: var(--muted); white-space: nowrap; font-weight: 600; }
.org { font-size: 13px; font-weight: 600; color: var(--accent); margin: 1px 0 5px; }
.org .place { color: var(--muted); font-weight: 500; }
.job ul { list-style: none; }
.job li { font-size: 12.8px; color: #43525f; padding-left: 14px; position: relative; margin-bottom: 3px; }
.job li::before { content: "▪"; color: var(--accent); position: absolute; left: 0; }

.block { margin-bottom: 12px; }
h4 { font-size: 13px; color: var(--ink); margin-bottom: 4px; }
.side-col ul { list-style: none; }
.side-col .block li, .edu li {
  font-size: 12.3px; color: #43525f; padding-left: 13px; position: relative; margin-bottom: 3px;
}
.side-col .block li::before, .edu li::before { content: "–"; position: absolute; left: 0; color: var(--accent); }
.edu li { margin-bottom: 7px; }

.kv { margin-bottom: 8px; }
.kv .k { display: block; font-size: 12.5px; font-weight: 700; color: var(--ink); }
.kv .v { display: block; font-size: 12.2px; color: #51616f; }

.foot {
  padding: 14px 32px; border-top: 1px solid var(--line);
  font-size: 12px; color: var(--muted); text-align: center;
}

@media (max-width: 760px) {
  .body { grid-template-columns: 1fr; gap: 8px; }
  .header { flex-direction: column; text-align: center; }
  .page { margin: 0; border-radius: 0; }
}

@media print {
  body { background: #fff; }
  .no-print { display: none !important; }
  .page { box-shadow: none; margin: 0; max-width: 100%; border-radius: 0; }
  .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .contact-strip { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; }
}
</style>
