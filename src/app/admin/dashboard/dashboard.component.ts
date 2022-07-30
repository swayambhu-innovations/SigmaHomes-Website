import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public dataProvider: DataProvider,
    public authService: AuthenticationService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const Graph = document.getElementById('graph') as HTMLCanvasElement;
    const Doughnut = document.getElementById('doughnut') as HTMLCanvasElement;
    if (Graph) {
      const lineChart = new Chart(Graph, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
              borderColor: '#4E8CE8',
              tension: 0.2,
            },
            {
              data: [45, 29, 40, 41, 26, 15, 10, 45, 29, 40, 41, 26, 15, 10],
              borderColor: '#E25454',
              tension: 0.2,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });
    }
    if (Doughnut) {
      const doughnutChart = new Chart(Doughnut, {
        type: 'doughnut',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 12,
                },
              },
            },
            title: {
              display: true,
              text: 'Stock Distribution',
              font: {
                size: 12,
              },
            },
          },
        },
      });
    }
  }
}
