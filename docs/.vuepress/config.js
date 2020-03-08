module.exports = {
    title: '星繪UE4文件',
    themeConfig: {
        nav: [

            { text: '一般', link: '/一般/Regex' },
            { text: 'Unreal', link: '/Unreal/FAQ' },

        ],
        sidebar: {
            '/一般/': [
                'Regex',
              
            ],
         
            '/Unreal/': [
                'FAQ', /* /bar/three.html */
            ],

            // fallback
            '/': [
                '',        /* / */
                'coding-style', /* /contact.html */
                'sop',
                'event-dispatcher',
                'quirks'
                // 'about'    /* /about.html */
            ]
        }
    },
    plugins: [['@dovyp/vuepress-plugin-clipboard-copy', true]]

}