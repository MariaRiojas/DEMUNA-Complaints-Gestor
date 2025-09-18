-- Datos iniciales para el sistema DEMUNA

-- Insertar usuarios del sistema
INSERT INTO users (username, email, password_hash, full_name, role, phone) VALUES
('admin', 'admin@demuna.gob.pe', '$2b$10$rQZ8kHWKtGY5uFQNvQZQHOxGxGxGxGxGxGxGxGxGxGxGxGxGxGxGx', 'Administrador del Sistema', 'supervisor', '+51-999-000-001'),
('operador01', 'operador01@demuna.gob.pe', '$2b$10$rQZ8kHWKtGY5uFQNvQZQHOxGxGxGxGxGxGxGxGxGxGxGxGxGxGxGx', 'María González Pérez', 'operador', '+51-999-000-002'),
('trabajador01', 'trabajador01@demuna.gob.pe', '$2b$10$rQZ8kHWKtGY5uFQNvQZQHOxGxGxGxGxGxGxGxGxGxGxGxGxGxGxGx', 'Carlos Ramírez Silva', 'trabajador_demuna', '+51-999-000-003'),
('supervisor01', 'supervisor01@demuna.gob.pe', '$2b$10$rQZ8kHWKtGY5uFQNvQZQHOxGxGxGxGxGxGxGxGxGxGxGxGxGxGxGx', 'Ana Lucia Torres', 'supervisor', '+51-999-000-004');

-- Insertar denuncias de ejemplo
INSERT INTO complaints (
    complaint_code, title, description, complaint_type, priority, status,
    complainant_name, complainant_phone, complainant_relationship,
    victim_name, victim_age, victim_gender, victim_ethnicity, victim_language,
    region, province, district, community, address,
    created_by, assigned_to
) VALUES
(
    'DEN-2024-001',
    'Violencia familiar en comunidad Shipibo',
    'Se reporta caso de violencia física y psicológica hacia menor de edad en comunidad indígena. La menor presenta signos de maltrato y ha faltado a clases frecuentemente.',
    'violencia_familiar',
    'alta',
    'activa',
    'Rosa Mendoza',
    '+51-999-111-001',
    'vecina',
    'Luz María Campos',
    12,
    'femenino',
    'Shipibo-Konibo',
    'Shipibo',
    'Ucayali',
    'Coronel Portillo',
    'Callería',
    'San Francisco',
    'Calle Los Cedros 123, San Francisco',
    2, -- operador01
    3  -- trabajador01
),
(
    'DEN-2024-002',
    'Abandono escolar por trabajo infantil',
    'Menor de edad ha dejado de asistir a la escuela para trabajar en actividades de pesca y agricultura. Los padres argumentan necesidad económica.',
    'trabajo_infantil',
    'media',
    'en_seguimiento',
    'Profesor Juan Vásquez',
    '+51-999-111-002',
    'docente',
    'Pedro Shahuano',
    14,
    'masculino',
    'Kukama',
    'Kukama',
    'Loreto',
    'Maynas',
    'Iquitos',
    'Padre Cocha',
    'Río Nanay, Padre Cocha',
    2, -- operador01
    3  -- trabajador01
),
(
    'DEN-2024-003',
    'Desnutrición infantil severa',
    'Se identifica caso de desnutrición severa en menor de edad. La familia carece de recursos y acceso a alimentos nutritivos. Requiere intervención inmediata.',
    'desnutricion',
    'critica',
    'resuelta',
    'Enfermera Patricia López',
    '+51-999-111-003',
    'personal_salud',
    'Esperanza Tsamaraint',
    8,
    'femenino',
    'Awajún',
    'Awajún',
    'Amazonas',
    'Condorcanqui',
    'Río Santiago',
    'Chapiza',
    'Comunidad Nativa Chapiza',
    2, -- operador01
    3  -- trabajador01
);

-- Insertar casos
INSERT INTO cases (case_code, title, description, status, priority, assigned_to, supervisor_id) VALUES
(
    'CASO-2024-001',
    'Intervención integral en comunidad San Francisco',
    'Caso que agrupa múltiples denuncias de violencia familiar en la comunidad San Francisco, requiere intervención coordinada.',
    'en_proceso',
    'alta',
    3, -- trabajador01
    4  -- supervisor01
),
(
    'CASO-2024-002',
    'Programa de prevención de trabajo infantil - Loreto',
    'Caso enfocado en la prevención y erradicación del trabajo infantil en comunidades ribereñas de Loreto.',
    'abierto',
    'media',
    3, -- trabajador01
    4  -- supervisor01
);

-- Relacionar denuncias con casos
INSERT INTO complaint_cases (complaint_id, case_id) VALUES
(1, 1), -- DEN-2024-001 -> CASO-2024-001
(2, 2), -- DEN-2024-002 -> CASO-2024-002
(3, 1); -- DEN-2024-003 -> CASO-2024-001

-- Insertar seguimientos de ejemplo
INSERT INTO trackings (
    complaint_id, case_id, tracking_type, title, description,
    activity_date, location, participants, outcomes, next_steps, created_by
) VALUES
(
    1, 1,
    'visita_domiciliaria',
    'Primera visita domiciliaria - Familia Campos',
    'Visita realizada al domicilio de la menor Luz María Campos para evaluar la situación familiar y condiciones de vida.',
    '2024-01-16 09:00:00',
    'Calle Los Cedros 123, San Francisco, Callería',
    'Carlos Ramírez (Trabajador DEMUNA), Rosa Mendoza (Denunciante), Familia Campos',
    'Se confirmó situación de violencia. Padres muestran disposición a recibir ayuda. Menor en condiciones físicas estables.',
    'Programar sesiones de terapia familiar. Coordinar con centro de salud para evaluación médica completa.',
    3 -- trabajador01
),
(
    2, 2,
    'entrevista',
    'Entrevista con menor Pedro Shahuano',
    'Entrevista individual con el menor para conocer su perspectiva sobre la situación escolar y laboral.',
    '2024-01-17 14:00:00',
    'Oficina DEMUNA Iquitos',
    'Carlos Ramírez (Trabajador DEMUNA), Pedro Shahuano (Menor)',
    'El menor expresa deseo de continuar estudios pero comprende necesidad económica familiar. Muestra interés en programas de apoyo.',
    'Gestionar beca de estudios. Coordinar con programa de apoyo económico familiar.',
    3 -- trabajador01
);

-- Insertar actas de ejemplo
INSERT INTO minutes (
    complaint_id, case_id, tracking_id, minute_type, title, content,
    participants, meeting_date, created_by
) VALUES
(
    1, 1, 1,
    'visita',
    'Acta de Visita Domiciliaria - Familia Campos',
    'En la fecha indicada se realizó visita domiciliaria al hogar de la menor Luz María Campos, ubicado en Calle Los Cedros 123, San Francisco, Callería. Se constató la situación reportada y se establecieron compromisos con la familia para el seguimiento del caso.',
    '[
        {"nombre": "Carlos Ramírez Silva", "rol": "Trabajador DEMUNA", "firma": true},
        {"nombre": "Rosa Mendoza", "rol": "Denunciante", "firma": true},
        {"nombre": "José Campos", "rol": "Padre de la menor", "firma": true}
    ]'::jsonb,
    '2024-01-16 09:00:00',
    3 -- trabajador01
);

-- Insertar evidencias de ejemplo
INSERT INTO evidence (
    complaint_id, case_id, tracking_id, evidence_type, title, description,
    file_name, file_path, collected_date, collected_by, created_by
) VALUES
(
    1, 1, 1,
    'foto',
    'Fotografías del domicilio - Familia Campos',
    'Fotografías tomadas durante la visita domiciliaria que muestran las condiciones de vida de la menor.',
    'visita_campos_fotos.jpg',
    '/evidence/2024/01/visita_campos_fotos.jpg',
    '2024-01-16 09:30:00',
    'Carlos Ramírez Silva',
    3 -- trabajador01
),
(
    2, 2, 2,
    'documento',
    'Certificado de estudios - Pedro Shahuano',
    'Certificado de estudios del menor que muestra su rendimiento académico previo al abandono escolar.',
    'certificado_pedro.pdf',
    '/evidence/2024/01/certificado_pedro.pdf',
    '2024-01-17 14:30:00',
    'Carlos Ramírez Silva',
    3 -- trabajador01
);
