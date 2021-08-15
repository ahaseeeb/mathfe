export class Question {

	public answer0: string;
	public answer0_image: string;
	public answer1: string;
	public answer1_image: string;
	public answer2: string;
	public answer2_image: string;
	public answer3: string;
	public answer3_image: string;
	public correct_answer: string;
	public difficulty_id: number;
	public id: number;
	public question: string;
	public question_image: string;
	public skill_id: number;
	public status_id: number;
  public type_id: number;
  public source:string;

	constructor() {
		this.answer0 = '';
		this.answer0_image = '';
		this.answer1 = '';
		this.answer1_image = '';
		this.answer2 = '';
		this.answer2_image = '';
		this.answer3 = '';
		this.answer3_image = '';
		this.correct_answer = '';
		this.difficulty_id = -1;
		this.id = -1;
		this.question = '';
		this.question_image = '';
		this.skill_id = -1;
		this.status_id = -1;
		this.type_id = -1;
	}
}
