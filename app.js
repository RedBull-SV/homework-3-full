// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts
  if (filter === 'passed') return attempts.filter((attempt) => attempt.passed === true)
  if (filter === 'failed') return attempts.filter((attempt) => attempt.passed === false)
  return attempts
}

function renderAttempts(attempts, count, list) {
  let html = ''
  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'
    html += `<li class="result-item">
      <span class="result-name">${escapeHtml(attempt.name)}</span>
      <span>${attempt.score} из ${window.reportData.questionCount} (${attempt.percentage}%) — ${status}</span>
    </li>`
  })
  list.innerHTML = html
  count.textContent = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  const count = document.querySelector('#result-count')
  const list = document.querySelector('#result-list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderAttempts(selectAttempts(select.value), count, list)
  })
}

startFilter()
