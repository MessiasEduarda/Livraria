package com.entrecapitulos.gestaolivraria.repository;

import com.entrecapitulos.gestaolivraria.entity.Venda;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public final class VendaSpecification {

    private VendaSpecification() {}

    /** Filtros opcionais: só adiciona predicado quando o parâmetro não é nulo (evita erro de tipo no PostgreSQL). */
    public static Specification<Venda> withFilters(
            LocalDateTime dataInicio,
            LocalDateTime dataFim,
            Venda.StatusVenda status,
            String categoria,
            Long vendedorId) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (dataInicio != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("dataVenda"), dataInicio));
            }
            if (dataFim != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("dataVenda"), dataFim));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (vendedorId != null) {
                predicates.add(cb.equal(root.get("vendedor").get("id"), vendedorId));
            }
            if (categoria != null && !categoria.isBlank()) {
                var subq = query.subquery(Long.class);
                var iv = subq.correlate(root).join("itens", JoinType.INNER);
                var l = iv.join("livro", JoinType.INNER);
                subq.select(cb.literal(1L)).where(cb.equal(l.get("categoria"), categoria));
                predicates.add(cb.exists(subq));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
