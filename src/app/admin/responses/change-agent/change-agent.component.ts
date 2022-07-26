import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-change-agent',
  templateUrl: './change-agent.component.html',
  styleUrls: ['./change-agent.component.scss'],
})
export class ChangeAgentComponent implements OnInit {
  agents: any[] = [];
  agentForm: FormGroup = new FormGroup({
    agentId: new FormControl(null, Validators.required),
  });
  @Output() agentChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { currentAgentId: any }
  ) {}

  ngOnInit(): void {
    this.databaseService.getAllAgentsPromise().then((docs: any) => {
      docs.forEach((element: any) => {
        this.agents.push({ ...element.data(), id: element.id });
      });
    });
  }

  submit() {
    if (this.agentForm.valid) {
      this.agentChanged.emit(this.agentForm.value);
      this.dialog.closeAll();
      this.agentForm.reset();
    }
  }
}
