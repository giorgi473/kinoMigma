export interface PageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}
