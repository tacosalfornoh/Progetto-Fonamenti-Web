import home from './pages/home.js';
import approfondimento from './pages/page1.js';
import modifica_dati from './pages/modifica_dati.js';
import tabella from './pages/page2.js';

const { createRouter, createWebHistory } = VueRouter;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: approfondimento },
        { path: '/Approfondimento', component:  home},
        { path: '/ModificaDati', component: modifica_dati },
        { path: '/Tabella', component: tabella }
    ]
});

export default router;