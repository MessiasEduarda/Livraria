// Tipos de erro
export type ValidationError = {
  field: 'title' | 'author' | 'price' | 'stock' | 'category' | 'general';
  message: string;
};

// Validação de título
export function validateTitle(title: string): ValidationError | null {
  if (!title || title.trim() === '') {
    return {
      field: 'title',
      message: 'Por favor, insira o título do livro'
    };
  }

  if (title.trim().length < 2) {
    return {
      field: 'title',
      message: 'O título deve ter no mínimo 2 caracteres'
    };
  }

  return null;
}

// Validação de autor
export function validateAuthor(author: string): ValidationError | null {
  if (!author || author.trim() === '') {
    return {
      field: 'author',
      message: 'Por favor, insira o nome do autor'
    };
  }

  if (author.trim().length < 2) {
    return {
      field: 'author',
      message: 'O nome do autor deve ter no mínimo 2 caracteres'
    };
  }

  return null;
}

// Validação de categoria
export function validateCategory(category: string): ValidationError | null {
  if (!category || category.trim() === '') {
    return {
      field: 'category',
      message: 'Por favor, selecione uma categoria'
    };
  }

  return null;
}

// Validação de preço
export function validatePrice(price: string): ValidationError | null {
  if (!price || price.trim() === '') {
    return {
      field: 'price',
      message: 'Por favor, insira o preço do livro'
    };
  }

  const priceValue = parseFloat(price);
  
  if (isNaN(priceValue) || priceValue <= 0) {
    return {
      field: 'price',
      message: 'Digite um preço válido maior que zero'
    };
  }

  if (priceValue > 9999.99) {
    return {
      field: 'price',
      message: 'O preço não pode ser maior que R$ 9.999,99'
    };
  }

  return null;
}

// Validação de estoque
export function validateStock(stock: string): ValidationError | null {
  if (!stock || stock.trim() === '') {
    return {
      field: 'stock',
      message: 'Por favor, insira a quantidade em estoque'
    };
  }

  const stockValue = parseInt(stock);
  
  if (isNaN(stockValue) || stockValue < 0) {
    return {
      field: 'stock',
      message: 'Digite uma quantidade válida maior ou igual a zero'
    };
  }

  if (stockValue > 9999) {
    return {
      field: 'stock',
      message: 'O estoque não pode ser maior que 9.999 unidades'
    };
  }

  if (!Number.isInteger(parseFloat(stock))) {
    return {
      field: 'stock',
      message: 'O estoque deve ser um número inteiro'
    };
  }

  return null;
}

// Validação completa do formulário
export function validateBookForm(data: {
  title: string;
  author: string;
  category: string;
  price: string;
  stock: string;
}): ValidationError | null {
  const titleError = validateTitle(data.title);
  if (titleError) return titleError;

  const authorError = validateAuthor(data.author);
  if (authorError) return authorError;

  const categoryError = validateCategory(data.category);
  if (categoryError) return categoryError;

  const priceError = validatePrice(data.price);
  if (priceError) return priceError;

  const stockError = validateStock(data.stock);
  if (stockError) return stockError;

  return null;
}

export const ERROR_MESSAGES = {
  TITLE_REQUIRED: 'Por favor, insira o título do livro',
  TITLE_MIN_LENGTH: 'O título deve ter no mínimo 2 caracteres',
  AUTHOR_REQUIRED: 'Por favor, insira o nome do autor',
  AUTHOR_MIN_LENGTH: 'O nome do autor deve ter no mínimo 2 caracteres',
  CATEGORY_REQUIRED: 'Por favor, selecione uma categoria',
  PRICE_REQUIRED: 'Por favor, insira o preço do livro',
  PRICE_INVALID: 'Digite um preço válido maior que zero',
  PRICE_MAX: 'O preço não pode ser maior que R$ 9.999,99',
  STOCK_REQUIRED: 'Por favor, insira a quantidade em estoque',
  STOCK_INVALID: 'Digite uma quantidade válida maior ou igual a zero',
  STOCK_MAX: 'O estoque não pode ser maior que 9.999 unidades',
  STOCK_INTEGER: 'O estoque deve ser um número inteiro',
};