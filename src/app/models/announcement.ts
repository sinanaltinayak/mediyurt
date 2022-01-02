export class Announcement{
    title!: string;
    content!: string;
    date!: string;

    constructor(title: string, content: string, date: string) {
        this.title = title;
        this.content = content;
        this.date = date;
    }
}