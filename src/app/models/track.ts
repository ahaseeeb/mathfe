export class Track {
  constructor(
    public id: string,
    public track: string,
    public description: string,
    public user_id: string,
    public image: string, 
    public status_id: string, 
    public field_id: string, 
    public level_id: string) {
  }
}
