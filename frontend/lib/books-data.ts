export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  pages: number;
  isbn: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  coverImage: string;
  language: string;
  edition: number;
}

export const booksData: Book[] = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publisher: 'Prentice Hall',
    year: 2008,
    pages: 464,
    isbn: '978-0132350884',
    price: 89.90,
    stock: 15,
    category: 'Programação',
    description: 'Um guia completo sobre como escrever código limpo e manutenível. Este livro é essencial para todo desenvolvedor que deseja melhorar suas habilidades de programação.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    language: 'Inglês',
    edition: 1
  },
  {
    id: '2',
    title: 'Design Patterns',
    author: 'Gang of Four',
    publisher: 'Addison-Wesley',
    year: 1994,
    pages: 395,
    isbn: '978-0201633610',
    price: 129.90,
    stock: 8,
    category: 'Arquitetura de Software',
    description: 'Os padrões de design fundamentais que todo engenheiro de software deve conhecer. Um clássico atemporal da engenharia de software.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    language: 'Inglês',
    edition: 1
  },
  {
    id: '3',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    publisher: "O'Reilly Media",
    year: 2008,
    pages: 176,
    isbn: '978-0596517748',
    price: 65.90,
    stock: 22,
    category: 'JavaScript',
    description: 'Uma exploração profunda das melhores práticas e recursos do JavaScript, focando nas partes que realmente importam.',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    language: 'Inglês',
    edition: 1
  },
  {
    id: '4',
    title: 'Refactoring',
    author: 'Martin Fowler',
    publisher: 'Addison-Wesley',
    year: 2018,
    pages: 448,
    isbn: '978-0134757599',
    price: 109.90,
    stock: 12,
    category: 'Programação',
    description: 'Técnicas comprovadas para melhorar o design de código existente e torná-lo mais legível, testável e manutenível.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    language: 'Inglês',
    edition: 2
  },
  {
    id: '5',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    publisher: 'Addison-Wesley',
    year: 2019,
    pages: 352,
    isbn: '978-0135957059',
    price: 95.90,
    stock: 18,
    category: 'Desenvolvimento',
    description: 'Um guia prático e inspirador para se tornar um programador melhor, com dicas e técnicas atemporais.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
    language: 'Inglês',
    edition: 2
  },
  {
    id: '6',
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    publisher: 'Addison-Wesley',
    year: 2003,
    pages: 560,
    isbn: '978-0321125217',
    price: 139.90,
    stock: 6,
    category: 'Arquitetura de Software',
    description: 'A obra definitiva sobre como modelar software complexo usando uma abordagem orientada ao domínio do negócio.',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    language: 'Inglês',
    edition: 1
  }
];

export function getBookById(id: string): Book | undefined {
  return booksData.find(book => book.id === id);
}

export function updateBook(id: string, updatedBook: Partial<Book>): Book | null {
  const index = booksData.findIndex(book => book.id === id);
  if (index !== -1) {
    booksData[index] = { ...booksData[index], ...updatedBook };
    return booksData[index];
  }
  return null;
}

export function getAllBooks(): Book[] {
  return booksData;
}
