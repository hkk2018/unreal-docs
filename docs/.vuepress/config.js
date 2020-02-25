module.exports = {
    title: 'UE4筆記',
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
                // 'contact', /* /contact.html */
                // 'about'    /* /about.html */
            ]
        }
    },
    plugins: [['@dovyp/vuepress-plugin-clipboard-copy', true]]

}