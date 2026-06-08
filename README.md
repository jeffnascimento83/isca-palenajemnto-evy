# Evy Monteiro — Landing Page

Landing page + página de obrigado da aula gratuita **Planejamento 360° / Roda da Gestão WOW Experience**, da Evy Monteiro.

HTML/CSS/JS puro — sem build step, sem framework, pronto para hospedar em qualquer estática (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

---

## 📁 Estrutura

```
evy-landing/
├── index.html              # landing principal
├── obrigado.html           # página pós-cadastro
├── assets/
│   ├── css/
│   │   ├── base.css        # tokens, reset, tipografia, botões, footer
│   │   ├── landing.css     # estilos da landing
│   │   ├── obrigado.css    # estilos da página de obrigado
│   │   └── editor.css      # toolbar de edição (carregado só com ?edit=1)
│   ├── js/
│   │   ├── config.js       # IDs de tracking e webhook do formulário
│   │   ├── tracking.js     # Meta Pixel + GA4
│   │   ├── landing.js      # modal, máscara, submit, UTM
│   │   ├── obrigado.js     # evento de conversão
│   │   └── editor.js       # modo editor A/B
│   └── img/
│       └── favicon.svg
└── README.md
```

---

## 🚀 Rodando localmente

Você precisa de um servidor estático (abrir o `index.html` direto pelo `file://` quebra os scripts e o CSS por causa de CORS).

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .

# ou Bun
bunx serve .
```

Abra `http://localhost:8000`.

---

## 🌐 Publicando

### GitHub Pages
1. Suba o repositório no GitHub.
2. **Settings → Pages → Source: `main` / root**.
3. Em alguns segundos seu site sobe em `https://SEU_USUARIO.github.io/SEU_REPO/`.

### Netlify
1. Arraste a pasta no [app.netlify.com](https://app.netlify.com/drop) **ou** conecte o repo.
2. Build command: *(em branco)* · Publish directory: `/`.

### Vercel
1. `vercel` no terminal **ou** conecte o repo em [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Other** · Output directory: `/`.

---

## ⚙️ Configuração (`assets/js/config.js`)

```js
window.EVY_CONFIG = {
  metaPixelId:    '',          // ex: '1234567890123456'
  ga4Id:          '',          // ex: 'G-XXXXXXXXXX'
  leadWebhookUrl: '',          // POST JSON quando o form é enviado
  thankYouPath:   'obrigado.html'
};
```

- Deixe vazio (`''`) para **desativar** um snippet. O site continua funcionando.
- Quando preencher `metaPixelId` ou `ga4Id`, os scripts são carregados automaticamente.

### Eventos disparados
| Página     | Evento                  | Quando                          |
|------------|-------------------------|---------------------------------|
| index      | `PageView`              | Ao carregar                     |
| index      | `Lead`                  | Ao abrir o modal                |
| index      | `CompleteRegistration`  | Ao enviar o formulário          |
| obrigado   | `PageView` + `Lead`     | Ao carregar                     |

---

## 📝 Integrando o formulário

A função `sendLead(payload)` em `assets/js/landing.js` é o ponto único de integração.

Por padrão ela faz `POST` JSON para `EVY_CONFIG.leadWebhookUrl` quando essa URL está preenchida. Os dados ficam também em `localStorage.evy_lead_draft` (útil para depurar).

Caminhos comuns de integração:

- **Webhook** (Zapier, Make, n8n, RD Station, ActiveCampaign): preencha `leadWebhookUrl` no `config.js`. Pronto.
- **Google Forms / Sheets**: substitua o corpo de `sendLead` por um `fetch` no `formResponse` do seu Google Form.
- **WhatsApp**: monte uma string `https://wa.me/55SEU_NUMERO?text=...` e use `window.location.href`.

O payload enviado:

```json
{
  "nome": "...",
  "email": "...",
  "whatsapp": "(21) 99999-9999",
  "instagram": "@seuinsta",
  "funcionarios": "...",
  "consciencia": "...",
  "desafios": "...",
  "urgencia": "...",
  "faturamento": "...",
  "utm": { "utm_source": "...", "utm_medium": "..." },
  "timestamp": "2026-06-08T12:00:00.000Z"
}
```

UTMs são preservados na redireção para `obrigado.html`.

---

## ✏️ Modo editor A/B

Para editar textos diretamente no navegador (sem aparecer para o público):

```
https://seusite.com/?edit=1
```

- Toolbar amarela aparece no topo.
- Campos editáveis: hero, subtítulo, estratégia, promessa, bio.
- **Exportar textos**: baixa `.txt` com todas as variações.
- **Restaurar original**: volta os textos iniciais.

Em URL limpa (sem `?edit=1`) **nada disso aparece** — produção fica 100% limpa.

---

## ✅ Melhorias aplicadas em relação aos arquivos originais

- SEO completo: title, description, Open Graph, Twitter Card, canonical, JSON-LD (Person + Course), favicon.
- `noindex, follow` na página de obrigado.
- Toolbar de edição A/B isolada atrás de `?edit=1` (não aparece em produção).
- Preço "R$ 00,00" trocado por **"Grátis"** com R$ 297 riscado ao lado.
- Links `http://` → `https://` (WhatsApp e Instagram).
- Acessibilidade: modal com `role="dialog"`, `aria-modal`, foco-trap, fechamento por `Esc`; botões com `aria-haspopup`; `fieldset/legend` em grupos de radio; contraste do rodapé corrigido (WCAG AA); `alt`s descritivos.
- Performance: `preconnect` para fonts/CDN, `loading="lazy"` + `width/height` em imagens fora do fold.
- Máscara automática de telefone BR e normalização do `@` do Instagram.
- UTMs preservados na transição landing → obrigado.
- CSS extraído para arquivos compartilhados (DRY).
- Slots de Meta Pixel e GA4 já cabeados, prontos para receber IDs.

---

## 📌 TODO

- [ ] Definir integração real do formulário (preencher `leadWebhookUrl` ou substituir `sendLead`).
- [ ] Criar página `politica-de-privacidade.html` e linkar no rodapé.
- [ ] Trocar `og:image` por uma imagem dedicada 1200×630 (compartilhamento em redes).
- [ ] Hospedar as imagens no próprio repo se quiser independência do site atual.

---

© 2025 Evy Monteiro
