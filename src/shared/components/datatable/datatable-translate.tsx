import { MRT_Localization } from 'material-react-table';

const genericTexts = {
  of: 'de',
  and: 'e',
  or: 'ou',
  changeSearchMode: 'Alternar Modo de Pesquisa',
  clickToCopy: 'Clique para Copiar',
  collapse: 'Agrupar',
  collapseAll: 'Agrupar Todos',
  copiedToClipboard: 'Clique para Copiar',
  copy: 'Copiar',
  dropToGroupBy: 'Arraste para o Agrupar',
  edit: 'Editar',
  expand: 'Expandir',
  expandAll: 'Expandir todos',
  grab: 'Pegar',
  groupByColumn: 'Agrupar por Coluna',
  groupedBy: 'Agrupado por',
  hideAll: 'Esconder Todos',
  hideColumn: 'Esconder Coluna',
  max: 'Máx.',
  min: 'Min.',
  move: 'Mover',
  noRecordsToDisplay: 'Nenhum registro encontrado',
  noResultsFound: 'Resultado não Encontrado',
  pin: 'Fixar',
  pinToLeft: 'Fixar á Esquerda',
  pinToRight: 'Fixar á Direita',
  resetColumnSize: '',
  resetOrder: 'Cancelar',
  search: 'Pesquisar',
  actions: 'Ações',
  cancel: 'Cancelar',
  save: 'Salvar',
  select: 'Selecionar',
  unpin: 'Desfixar;',
  unpinAll: 'Desfixar Todos',
};

const pageTexts = {
  rowsPerPage: 'Linhas por Página',
  goToNextPage: 'Próx. Página',
  goToPreviousPage: 'Ant. Página',
  goToFirstPage: 'Primeira Página',
  goToLastPage: 'Última Página',
};

const columnTexts = {
  columnActions: 'Ações da Coluna',
  ungroupByColumn: 'Desagrupar por Coluna',
  hideColumn: 'Esconder Coluna',
  showAllColumns: 'Mostrar Todas Colunas',
  filterByColumn: 'Filtrar por',
};

const rowTexts = {
  rowNumbers: 'Número de Linhas',
  rowNumber: 'Número da Linha',
  rowActions: 'Ações',
  rowsPerPage: 'Linhas por Página',
};

const filterTexts = {
  changeFilterMode: 'Mudar Modo de Filtro',
  filterArrIncludes: 'Filtrar Inclue em',
  filterArrIncludesAll: 'Filtrar Inclue em Todos',
  filterArrIncludesSome: 'Filtrar Inclue Parcialmente',
  filterBetween: 'Filtrar Entre',
  filterBetweenInclusive: 'Filtrar Entre',
  filterContains: 'Filtrar Incluso',
  filterEmpty: 'Filtrar Vazio',
  filterEndsWith: 'Filtrar Termina com',
  filterEquals: 'Filtrar Igual á',
  filterEqualsString: 'Filtrar Igual á',
  filterFuzzy: 'Filtrar Difuso',
  filterGreaterThan: 'Filtrar Maior que',
  filterGreaterThanOrEqualTo: 'Filtrar Maior ou Igual que',
  filterIncludesString: 'Filtrar Texto',
  filterIncludesStringSensitive: 'Filtrar Texto Sensível',
  filteringByColumn: 'Filtrando por Coluna',
  filterInNumberRange: 'Filtrar por Valor',
  filterLessThan: 'Filtrar Menor que',
  filterLessThanOrEqualTo: 'Filtrar Menor ou igual que',
  filterMode: 'Modo Filtro',
  filterNotEmpty: 'Filtro não está vazio',
  filterNotEquals: 'Filtrar diferente que',
  filterStartsWith: 'Filtrar Inicia com',
};

const sortTexts = {
  sortByColumnAsc: 'Ordernar por Coluna (A-z)',
  sortByColumnDesc: 'Ordernar por Coluna (z-A)',
  sortedByColumnAsc: 'Ordernado por Coluna (A-z)',
  sortedByColumnDesc: 'Ordernado por Coluna (z-A)',
};

const toggleTexts = {
  toggleDensity: 'Alternar Volume',
  toggleFullScreen: 'Alternar Tela Cheia',
  toggleSelectAll: 'Alternar Selecionar Todos',
  toggleSelectRow: 'Alternar Linha Selecionada',
  toggleVisibility: 'Alternar Visibilidade',
};

const showTexts = {
  showAll: 'Mostrar Todos',
  showAllColumns: 'Mostrar Todas Colunas',
  showHideColumns: 'Mostrar/Oculpar Colunas',
  showHideFilters: 'Mostrar/Oculpar Filtros',
  showHideSearch: 'Mostrar/Oculpar Pesquisa',
};

const clearTexts = {
  clearFilter: 'Limpar Filtros',
  clearSearch: 'Limpar Pesquisa',
  clearSelection: 'Limpar Seleções',
  clearSort: 'Limpar Ordenação',
};

export const DataTableTranslate: Partial<MRT_Localization> = {
  ...pageTexts,
  ...columnTexts,
  ...genericTexts,
  ...rowTexts,
  ...sortTexts,
  ...filterTexts,
  ...toggleTexts,
  ...showTexts,
  ...clearTexts,
};
