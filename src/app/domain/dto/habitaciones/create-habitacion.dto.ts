export interface CreateHabitacionDto {
  numero_habitacion: string;
  id_categoria: number;
  id_estado_habitacion: number;
  descripcion: string | null;
  servicios_incluidos: string | null;
  id_sucursal: number;
}
