import {
  getSolveaGraphSchema,
  HomepageSchema,
  SoftWarePageSchema,
} from '@/constant/structuredData';

const HOMEPAGE_PATH_SET = new Set(['', '/', '/agent-for-smb']);

function normalizePath(path: string): string {
  return path.replace(/^\/(jp|es|de|cn|fr|pt)/, '') || '/';
}

interface Props {
  pathname: string;
}

/** 全站注入 @graph（Organization/WebSite/WebPage/BreadcrumbList/SoftwareApplication）；首页额外注入 FAQPage（JSON-LD，服务端输出） */
export default function StructuredData({ pathname }: Props) {
  const path = normalizePath(pathname);
  const isHomepage = HOMEPAGE_PATH_SET.has(path) || path === 'agent-for-smb';
  const isSoftwarePage =
    !path.includes('/glossary') &&
    !path.includes('/customer-stories') &&
    !path.includes('/compare');
  let schema: any[] = [];

  // 首页全量注入
  if (isHomepage) {
    schema = HomepageSchema;
  }

  // 软件页全量注入
  if (isSoftwarePage) {
    schema = SoftWarePageSchema;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSolveaGraphSchema(schema)),
      }}
    />
  );
}
