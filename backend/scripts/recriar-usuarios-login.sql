-- ============================================================
-- Script: apagar usuários de login para serem recriados pelo backend
-- Banco: gestaolivraria
-- Use se os logins (admin, maria, henrique) não funcionarem.
-- Depois de rodar este script, REINICIE o backend para o
-- DataInitializer criar os 3 usuários de novo com senha correta.
-- ============================================================

-- Apaga os papéis (FK para usuarios)
DELETE FROM usuario_roles
WHERE usuario_id IN (
  SELECT id FROM usuarios
  WHERE email IN (
    'admin@entrecapitulos.com.br',
    'maria@entrecapitulos.com.br',
    'henrique@entrecapitulos.com.br'
  )
);

-- Apaga os usuários
DELETE FROM usuarios
WHERE email IN (
  'admin@entrecapitulos.com.br',
  'maria@entrecapitulos.com.br',
  'henrique@entrecapitulos.com.br'
);

-- Pronto. Reinicie o backend (mvn spring-boot:run ou Run na IDE).
-- Na subida, o DataInitializer vai criar os 3 usuários com as senhas:
--   admin@entrecapitulos.com.br / admin123
--   maria@entrecapitulos.com.br / maria123
--   henrique@entrecapitulos.com.br / henrique123
