import { GetServerSidePropsContext } from "next";
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap'

export const getServerSideProps  = async (context: GetServerSidePropsContext) =>{
    const magazineIds: string[] = ['27385e4f-e126-4980-8ea7-aa37592a2fcc'];
    const sitemapFields: ISitemapField[] = magazineIds.map((magazineId) => {
        return {
            loc: `http://localhost:3000/post/${magazineId}`, // 페이지 경로
            lastmod: new Date().toISOString(), // 최근변경일자
            changefreq: 'daily', // 페이지 주소 변경 빈도 (검색엔진에 제공됨) - always, daily, hourly, monthly, never, weekly, yearly 중 택 1
            priority: 1, // 페이지 주소 우선순위 (검색엔진에 제공됨, 우선순위가 높은 순서대로 크롤링함)
        }
    });

    return getServerSideSitemapLegacy(context, sitemapFields);
}

export default () => {
    //
};