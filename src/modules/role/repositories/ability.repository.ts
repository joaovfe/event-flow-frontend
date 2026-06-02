import { Repository } from '@/core/http/repository';

import { Pagination } from '@/shared/domain';
import { isArray } from '@/shared/utils';

import { Ability, AbilityListDTO } from '../domain';

export class AbilityRepository extends Repository {
  static instance: AbilityRepository;

  constructor() {
    super('abilities');

    if (AbilityRepository.instance) {
      return AbilityRepository.instance;
    }

    AbilityRepository.instance = this;
  }

  public async list(params?: AbilityListDTO): Promise<Pagination<Ability>> {
    const { status, data } = await this.http.get<Pagination<Ability>>('/', {
      params: {
        ...params?.filters,
        ...params?.pagination,
      },
    });

    if (this.isOK(status)) {
      return {
        total: data.total ?? 0,
        pages: data.pages ?? 1,
        data: isArray(data.data)
          ? data.data.map((ability) => new Ability(ability))
          : [],
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
