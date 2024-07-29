// utils/fetchRelatedAssets.ts
export const fetchFilesList = async (): Promise<any[]> => {
  const response = await fetch(`https://api.github.com/repos/Tastenkunst/eternl-guard/contents/src/entries`);
  if (!response.ok) {
    throw new Error('Failed to fetch files list');
  }
  const files = await response.json();
  return files.filter((file: any) => file.type === 'file' && file.name.endsWith('.json'));
};

export const fetchJsonFile = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch JSON file');
  }
  const json = await response.json();
  return json;
};

export const fetchRelatedAssets = async (): Promise<string[]> => {
  try {
    const filesList = await fetchFilesList();
    const relatedAssetsPromises = filesList.map((file: any) => fetchJsonFile(file.download_url));
    
    const jsonFiles = await Promise.all(relatedAssetsPromises);
    const allRelatedAssets = jsonFiles.flatMap((json: any) => json.related_assets || []);
    
    return allRelatedAssets;
  } catch (error) {
    console.error('Error fetching related assets:', error);
    return [];
  }
};


export const testBadAssets: string[] = [
  "asset1ex9j5c0jux47u00m7jce8umcp7dh6arp2szep9",
  "asset1zatf43h9htc33rvxvaj4cf60d6thystyx6szp0",
  "asset18sztcpscy2sv4yj6j4u8xs999699x3myrmqjs4"
];