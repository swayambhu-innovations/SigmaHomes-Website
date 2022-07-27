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
  agents: {
    [key: string]: any;
  } = {};
  agentForm: FormGroup = new FormGroup({
    agent: new FormControl(null, Validators.required),
  });
  @Output() agentChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { currentAgentId: any }
  ) {}

  ngOnInit(): void {
    this.databaseService.getAllAgentsPromise().then((docs: any) => {
      docs.forEach((doc: any) => {
        this.agents[doc.id] = { id: doc.id, ...doc.data() };
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
