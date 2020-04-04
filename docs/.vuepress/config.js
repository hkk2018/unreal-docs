module.exports = {
    title: '星繪UE4文件',
    themeConfig: {
        nav: [
            { text: '概論', link: '/' },
            { text: '架構', link: '/架構/game-structure' },
            { text: '實作', link: '/實作/' },
            { text: '功能', link: '/功能/' },

        ],
        sidebar: {

            '/架構/': [
                'game-structure'
            ],
            '/實作/': [
                '', /* /bar/three.html */
            ],
            '/功能/': [
                '', /* /bar/three.html */
            ],

            '/': [ //靠這個不放在最後會導致前面的sidebar都不能正常跑耶
                '',        /* / */
                'generic',
                'coding-style', /* /contact.html */
                'begginer-FAQ',
                'sop',
                'event-dispatcher',
                'quirks'
                // 'about'    /* /about.html */
            ],
            // fallback
          
        }
    },
    plugins: [['@dovyp/vuepress-plugin-clipboard-copy', true]]

}