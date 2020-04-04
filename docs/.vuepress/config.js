module.exports = {
    title: '星繪UE4文件',
    themeConfig: {
        nav: [
            { text: '概論', link: '/' },
            { text: '架構', link: '/structure/test' },
            { text: '實作', link: '/實作/' },
            { text: '功能', link: '/功能/' },

        ],
        sidebar: {
            '/': [
                '',        /* / */
                'generic',
                'coding-style', /* /contact.html */
                'begginer-FAQ',
                'sop',
                'event-dispatcher',
                'quirks'
                // 'about'    /* /about.html */
            ],
            '/structure/': [
                '',
                'test'
              
            ],
            '/實作/': [
                '', /* /bar/three.html */
            ],
            '/功能/': [
                '', /* /bar/three.html */
            ],

            // fallback
          
        }
    },
    plugins: [['@dovyp/vuepress-plugin-clipboard-copy', true]]

}