module.exports = {
    title: '星繪UE4文件',
    themeConfig: {
        nav: [
            { text: '概論', link: '/' },
            { text: '架構', link: '/架構/game-structure' },
            { text: '實作', link: '/實作/evil-zombie' },
            { text: '功能', link: '/功能/state' },

        ],
        sidebar: {
            /**  */
            '/架構/': [
                'game-structure'
            ],
            '/實作/': [
                'evil-zombie', /* /bar/three.html */
            ],
            '/功能/': [
                'state',
                'space-method', /* /bar/three.html */
            ],

            '/': [ //靠這個不放在最後會導致前面的sidebar都不能正常跑耶
                // '',        /* / */
                'coding-style', /* /contact.html */
                'begginer-tutorial',
                'engine-features',
                'quirks',
                'package',
                'dist',
                'performance',
                'material',
                'env-design',
                'blender-modeling',
                'widget',
                'project-setup',
                'AI',
                'bp-tips'
                // 'about'    /* /about.html */
            ],
            // fallback

        }
    },
    plugins: [['@dovyp/vuepress-plugin-clipboard-copy', true]]

}