import { CrudService } from '../../services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class TagsComponent implements OnInit, OnDestroy {

  apiName = "tags";
  tags = signal<any[]>([]);
  searchTerm = signal("");

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Tags");
    this.getAllTags();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllTags() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.tags.set(response);
      }
    );
  }

  public addTag(tagName: string) {
    const tag: any = {
      name: tagName
    };
    this.crudService.createItem(this.apiName, tag).subscribe(
      (response: any) => {
        tag.id = response.id;      
        this.tags.update(tags => [...tags, tag]);
      }
    );
  }

  public deleteTag(tag: any) {
    this.crudService.deleteItem(this.apiName, tag).subscribe(
      () => {
        this.tags.update(tags => tags.filter(t => t.id !== tag.id));
      }
    );
  }

}
