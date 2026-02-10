package com.entrecapitulos.gestaolivraria.config;

import com.entrecapitulos.gestaolivraria.entity.Categoria;
import com.entrecapitulos.gestaolivraria.entity.Cliente;
import com.entrecapitulos.gestaolivraria.entity.Livro;
import com.entrecapitulos.gestaolivraria.entity.Usuario;
import com.entrecapitulos.gestaolivraria.repository.CategoriaRepository;
import com.entrecapitulos.gestaolivraria.repository.ClienteRepository;
import com.entrecapitulos.gestaolivraria.repository.LivroRepository;
import com.entrecapitulos.gestaolivraria.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final LivroRepository livroRepository;
    private final ClienteRepository clienteRepository;
    private final CategoriaRepository categoriaRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (usuarioRepository.findByEmail("admin@entrecapitulos.com.br").isEmpty()) {
            log.info("Criando usuário admin@entrecapitulos.com.br");
            Usuario admin = Usuario.builder()
                    .email("admin@entrecapitulos.com.br")
                    .senha(passwordEncoder.encode("admin123"))
                    .nome("Administrador")
                    .ehVendedor(true)
                    .roles(Set.of("USER", "ADMIN"))
                    .build();
            usuarioRepository.save(admin);
        }
        if (usuarioRepository.findByEmail("maria@entrecapitulos.com.br").isEmpty()) {
            log.info("Criando usuário maria@entrecapitulos.com.br");
            Usuario maria = Usuario.builder()
                    .email("maria@entrecapitulos.com.br")
                    .senha(passwordEncoder.encode("maria123"))
                    .nome("Maria")
                    .ehVendedor(true)
                    .roles(Set.of("USER"))
                    .build();
            usuarioRepository.save(maria);
        }
        if (usuarioRepository.findByEmail("henrique@entrecapitulos.com.br").isEmpty()) {
            log.info("Criando usuário henrique@entrecapitulos.com.br");
            Usuario henrique = Usuario.builder()
                    .email("henrique@entrecapitulos.com.br")
                    .senha(passwordEncoder.encode("henrique123"))
                    .nome("Henrique")
                    .ehVendedor(true)
                    .roles(Set.of("USER"))
                    .build();
            usuarioRepository.save(henrique);
        }

        // Categorias iniciais (somente se não houver nenhuma)
        if (categoriaRepository.count() == 0) {
            log.info("Inserindo categorias iniciais...");
            for (String nome : List.of("Ficção", "Tecnologia", "Fantasia", "História", "Autoajuda", "Filosofia", "Programação", "Desenvolvimento", "Design")) {
                categoriaRepository.save(Categoria.builder().nome(nome).build());
            }
            log.info("Categorias iniciais inseridas.");
        }

        // Livros iniciais: insere sempre que não existir por ISBN (para ter os livros padrão em toda execução)
        log.info("Verificando livros iniciais...");
        if (!livroRepository.existsByIsbn("978-85-336-1588-6")) {
            livroRepository.save(Livro.builder().titulo("O Senhor dos Anéis").autor("J.R.R. Tolkien").editora("Martins Fontes").ano(2001).isbn("978-85-336-1588-6").preco(new BigDecimal("59.90")).estoque(25).categoria("Fantasia").descricao("A saga épica da Terra-média.").imagemCapa("https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }
        if (!livroRepository.existsByIsbn("978-85-325-1076-2")) {
            livroRepository.save(Livro.builder().titulo("Harry Potter e a Pedra Filosofal").autor("J.K. Rowling").editora("Rocco").ano(2000).isbn("978-85-325-1076-2").preco(new BigDecimal("39.90")).estoque(40).categoria("Fantasia").descricao("O primeiro livro da série Harry Potter.").imagemCapa("https://images.unsplash.com/photo-1618836850461-81b3a1969e30?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }
        if (!livroRepository.existsByIsbn("978-85-7608-216-8")) {
            livroRepository.save(Livro.builder().titulo("Clean Code").autor("Robert C. Martin").editora("Alta Books").ano(2009).isbn("978-85-7608-216-8").preco(new BigDecimal("89.90")).estoque(15).categoria("Tecnologia").descricao("Manual de desenvolvimento ágil com código limpo.").imagemCapa("https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }
        if (!livroRepository.existsByIsbn("978-85-254-2968-2")) {
            livroRepository.save(Livro.builder().titulo("Sapiens").autor("Yuval Noah Harari").editora("L&PM").ano(2015).isbn("978-85-254-2968-2").preco(new BigDecimal("49.90")).estoque(30).categoria("História").descricao("Uma breve história da humanidade.").imagemCapa("https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }
        if (!livroRepository.existsByIsbn("978-85-390-0390-6")) {
            livroRepository.save(Livro.builder().titulo("O Poder do Hábito").autor("Charles Duhigg").editora("Objetiva").ano(2012).isbn("978-85-390-0390-6").preco(new BigDecimal("44.90")).estoque(22).categoria("Autoajuda").descricao("Por que fazemos o que fazemos na vida e nos negócios.").imagemCapa("https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }
        if (!livroRepository.existsByIsbn("978-85-359-1340-7")) {
            livroRepository.save(Livro.builder().titulo("1984").autor("George Orwell").editora("Companhia das Letras").ano(2009).isbn("978-85-359-1340-7").preco(new BigDecimal("45.90")).estoque(18).categoria("Ficção").descricao("Romance distópico sobre totalitarismo.").imagemCapa("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }
        if (!livroRepository.existsByIsbn("978-85-220-1022-2")) {
            livroRepository.save(Livro.builder().titulo("O Pequeno Príncipe").autor("Antoine de Saint-Exupéry").editora("Agir").ano(2018).isbn("978-85-220-1022-2").preco(new BigDecimal("29.90")).estoque(50).categoria("Ficção").descricao("O clássico atemporal sobre amizade e humanidade.").imagemCapa("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }
        if (!livroRepository.existsByIsbn("978-85-62478-12-5")) {
            livroRepository.save(Livro.builder().titulo("A Arte da Guerra").autor("Sun Tzu").editora("Jardim dos Livros").ano(2010).isbn("978-85-62478-12-5").preco(new BigDecimal("35.90")).estoque(20).categoria("Filosofia").descricao("Tratado militar clássico sobre estratégia.").imagemCapa("https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop").idioma("Português").edicao(1).build());
        }

        // Clientes iniciais: insere sempre que não existir por CPF (para ter os clientes padrão em toda execução)
        log.info("Verificando clientes iniciais...");
        if (!clienteRepository.existsByCpf("123.456.789-00")) {
            clienteRepository.save(Cliente.builder().nome("Ana Silva").email("ana.silva@email.com").telefone("(11) 98765-4321").cpf("123.456.789-00").status(Cliente.StatusCliente.ACTIVE).endereco("Rua das Flores, 123").cidade("São Paulo").estado("SP").cep("01234-567").dataCadastro(LocalDate.now()).build());
        }
        if (!clienteRepository.existsByCpf("234.567.890-11")) {
            clienteRepository.save(Cliente.builder().nome("Carlos Santos").email("carlos.santos@email.com").telefone("(11) 91234-5678").cpf("234.567.890-11").status(Cliente.StatusCliente.ACTIVE).endereco("Av. Paulista, 456").cidade("São Paulo").estado("SP").cep("01310-100").dataCadastro(LocalDate.now()).build());
        }
        if (!clienteRepository.existsByCpf("345.678.901-22")) {
            clienteRepository.save(Cliente.builder().nome("Maria Oliveira").email("maria.oliveira@email.com").telefone("(21) 99876-5432").cpf("345.678.901-22").status(Cliente.StatusCliente.ACTIVE).endereco("Rua do Catete, 789").cidade("Rio de Janeiro").estado("RJ").cep("22220-000").dataCadastro(LocalDate.now()).build());
        }
        if (!clienteRepository.existsByCpf("456.789.012-33")) {
            clienteRepository.save(Cliente.builder().nome("João Pereira").email("joao.pereira@email.com").telefone("(31) 98888-7777").cpf("456.789.012-33").status(Cliente.StatusCliente.VIP).endereco("Av. Afonso Pena, 321").cidade("Belo Horizonte").estado("MG").cep("30130-001").dataCadastro(LocalDate.now()).build());
        }
        if (!clienteRepository.existsByCpf("567.890.123-44")) {
            clienteRepository.save(Cliente.builder().nome("Fernanda Costa").email("fernanda.costa@email.com").telefone("(41) 97777-6666").cpf("567.890.123-44").status(Cliente.StatusCliente.ACTIVE).endereco("Rua XV de Novembro, 654").cidade("Curitiba").estado("PR").cep("80020-310").dataCadastro(LocalDate.now()).build());
        }
    }
}
