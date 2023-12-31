// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      SUPABASE_SB: process.env.SUPABASE_SB,
      APP_URL_BASE: process.env.APP_URL_BASE,
    },
  },
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@nuxtjs/supabase"],
  css: [
    "primevue/resources/themes/lara-light-teal/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
  ],
  primevue: {
    /* Options */
    usePrimeVue: true,

    components: {
      include: [
        "Button",
        "DataTable",
        "InputText",
        "Toast",
        "ToastService",
        "Dropdown",
        "Sidebar",
        "Avatar",
        "PanelMenu",
        "Message",
        "Textarea",
        "DataView",
        "Card",
        "DataTable",
        "Column",
        "ColumnGroup",
        "Row",
        "TabView",
        "TabPanel",
        "Calendar",
        "Chip",
        "Checkbox",
        "Badge",
      ],
    },
  },
  supabase: {
    // Options
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/register", "/admin/codes/*"],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
      secure: true,
    },
    clientOptions: {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },
});
