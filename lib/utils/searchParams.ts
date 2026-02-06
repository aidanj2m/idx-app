import { PropertyFilters } from '@/lib/types/property';

export function searchParamsToFilters(params: URLSearchParams): PropertyFilters {
  const filters: PropertyFilters = {
    limit: 50,
    offset: 0,
  };

  const minprice = params.get('minprice');
  const maxprice = params.get('maxprice');
  const minbeds = params.get('minbeds');
  const maxbeds = params.get('maxbeds');
  const minbaths = params.get('minbaths');
  const maxbaths = params.get('maxbaths');
  const type = params.get('type');
  const q = params.get('q');

  if (minprice) filters.minprice = Number(minprice);
  if (maxprice) filters.maxprice = Number(maxprice);
  if (minbeds) filters.minbeds = Number(minbeds);
  if (maxbeds) filters.maxbeds = Number(maxbeds);
  if (minbaths) filters.minbaths = Number(minbaths);
  if (maxbaths) filters.maxbaths = Number(maxbaths);
  if (type) filters.type = type;
  if (q) filters.q = q;

  return filters;
}

export function filtersToSearchParams(filters: Partial<PropertyFilters>): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });
  return params.toString();
}
