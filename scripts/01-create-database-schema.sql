-- DEMUNA Database Schema
-- Sistema de Gestión de Denuncias para Protección de Niñas de Pueblos Originarios

-- Tabla de usuarios del sistema
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('operador', 'trabajador_demuna', 'supervisor')),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de denuncias
CREATE TABLE IF NOT EXISTS complaints (
    id SERIAL PRIMARY KEY,
    complaint_code VARCHAR(20) UNIQUE NOT NULL, -- DEN-2024-001
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    complaint_type VARCHAR(50) NOT NULL,
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('baja', 'media', 'alta', 'critica')),
    status VARCHAR(20) NOT NULL DEFAULT 'activa' CHECK (status IN ('activa', 'en_seguimiento', 'resuelta', 'cerrada')),
    
    -- Información del denunciante
    complainant_name VARCHAR(100),
    complainant_phone VARCHAR(20),
    complainant_email VARCHAR(100),
    complainant_relationship VARCHAR(50), -- madre, padre, familiar, vecino, etc.
    
    -- Información de la víctima
    victim_name VARCHAR(100) NOT NULL,
    victim_age INTEGER,
    victim_gender VARCHAR(10),
    victim_ethnicity VARCHAR(50), -- pueblo originario específico
    victim_language VARCHAR(30),
    
    -- Ubicación
    region VARCHAR(50) NOT NULL,
    province VARCHAR(50),
    district VARCHAR(50),
    community VARCHAR(100), -- comunidad específica
    address TEXT,
    coordinates POINT, -- para mapas de calor
    
    -- Metadatos
    created_by INTEGER REFERENCES users(id),
    assigned_to INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de casos (agrupación de denuncias relacionadas)
CREATE TABLE IF NOT EXISTS cases (
    id SERIAL PRIMARY KEY,
    case_code VARCHAR(20) UNIQUE NOT NULL, -- CASO-2024-001
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'abierto' CHECK (status IN ('abierto', 'en_proceso', 'cerrado')),
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('baja', 'media', 'alta', 'critica')),
    
    -- Asignación
    assigned_to INTEGER REFERENCES users(id),
    supervisor_id INTEGER REFERENCES users(id),
    
    -- Fechas importantes
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,
    deadline TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relación entre denuncias y casos
CREATE TABLE IF NOT EXISTS complaint_cases (
    id SERIAL PRIMARY KEY,
    complaint_id INTEGER REFERENCES complaints(id) ON DELETE CASCADE,
    case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(complaint_id, case_id)
);

-- Tabla de seguimientos
CREATE TABLE IF NOT EXISTS trackings (
    id SERIAL PRIMARY KEY,
    complaint_id INTEGER REFERENCES complaints(id) ON DELETE CASCADE,
    case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
    
    tracking_type VARCHAR(30) NOT NULL, -- visita_domiciliaria, entrevista, coordinacion, etc.
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    
    -- Información de la actividad
    activity_date TIMESTAMP NOT NULL,
    location VARCHAR(200),
    participants TEXT, -- personas que participaron
    
    -- Resultados
    outcomes TEXT,
    next_steps TEXT,
    
    -- Metadatos
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de actas
CREATE TABLE IF NOT EXISTS minutes (
    id SERIAL PRIMARY KEY,
    complaint_id INTEGER REFERENCES complaints(id) ON DELETE CASCADE,
    case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
    tracking_id INTEGER REFERENCES trackings(id) ON DELETE CASCADE,
    
    minute_type VARCHAR(30) NOT NULL, -- reunion, entrevista, visita, etc.
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    
    -- Participantes
    participants JSONB, -- array de objetos con nombre, rol, firma
    
    -- Fechas
    meeting_date TIMESTAMP NOT NULL,
    
    -- Metadatos
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de evidencias
CREATE TABLE IF NOT EXISTS evidence (
    id SERIAL PRIMARY KEY,
    complaint_id INTEGER REFERENCES complaints(id) ON DELETE CASCADE,
    case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
    tracking_id INTEGER REFERENCES trackings(id) ON DELETE CASCADE,
    minute_id INTEGER REFERENCES minutes(id) ON DELETE CASCADE,
    
    evidence_type VARCHAR(30) NOT NULL, -- documento, foto, audio, video, etc.
    title VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Archivo
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INTEGER,
    mime_type VARCHAR(100),
    
    -- Metadatos
    collected_date TIMESTAMP,
    collected_by VARCHAR(100),
    
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de auditoría
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    changed_by INTEGER REFERENCES users(id),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_priority ON complaints(priority);
CREATE INDEX IF NOT EXISTS idx_complaints_region ON complaints(region);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at);
CREATE INDEX IF NOT EXISTS idx_complaints_assigned_to ON complaints(assigned_to);
CREATE INDEX IF NOT EXISTS idx_complaints_coordinates ON complaints USING GIST(coordinates);

CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_assigned_to ON cases(assigned_to);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at);

CREATE INDEX IF NOT EXISTS idx_trackings_complaint_id ON trackings(complaint_id);
CREATE INDEX IF NOT EXISTS idx_trackings_case_id ON trackings(case_id);
CREATE INDEX IF NOT EXISTS idx_trackings_activity_date ON trackings(activity_date);

CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_changed_at ON audit_log(changed_at);

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON complaints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trackings_updated_at BEFORE UPDATE ON trackings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_minutes_updated_at BEFORE UPDATE ON minutes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
