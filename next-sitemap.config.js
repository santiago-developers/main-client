module.exports = {
    siteUrl: 'http://localhost:3000/main',
    robotsTxtOptions: {
        // 추가 sitemap 설정
        additionalSitemaps: [
            'http://localhost:3000/sitemap/product-sitemap.xml', //실제 도메인으로 변경해야함
        ]
    } // robots.txt 옵션 설정
  }