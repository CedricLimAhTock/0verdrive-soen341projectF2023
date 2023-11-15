# 0verdrive-soen341projectF2023

![Logo](./media/logo.png)

<details>
  <summary><h2>Table of Contents<h2></summary>
  <ol>
    <li>
      <a href="#about-">About</a>
      <ul>
        <li><a href="#team">Team</a></li>
        <li><a href="#project">Project Approach</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#Setup">Setup</a>
      <ul>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<br>

## About

The purpose of this project is to introduce students to collaborative software development work using common industry tools and practices such as GitHub and the Agile methodology. The goal is to build a real-estate web application where different types of users can buy, sell or rent properties.

<br>

### Team

Meet team 0verdrive :fire:

Our team rules can be found on our **[wiki](https://github.com/CedricLimAhTock/0verdrive-soen341projectF2023/wiki/Project-WorkFlow)**.
<table>
    <tr>
        <th>Member</th>
        <th>Role</th>
        <th>Responsibilities</th>
    </tr>
    <tr>
        <td>Cedric Lim Ah Tock</td>
        <td>Team Leader</td>
        <td>Manage repo, UI/UX design, Frontend and Backend dev<br>
          Dev facilitator: point of reference for others.</td>
    </tr>
    <tr>
        <td>Soumyajeet Bhowmik</td>
        <td>Quality Assurance</td>
        <td>Frontend and Backend dev</td>
    </tr>
    <tr>
        <td>Noah Burns</td>
        <td>Design Master</td>
        <td>Design interface, UI/UX design, API</td>
    </tr>
    <tr>
        <td>Sonali Patel</td>
        <td>Database Manager</td>
        <td>Design database, server<br>
          Meeting Owner</td>
    </tr>
    <tr>
        <td>Kristi Doce</td>
        <td>Scrum Master</td>
        <td>
          Manage sprint(board) / meetings, task planning & backlog, responsible for deliverables<br>
          Design database, server
        </td>
    </tr>
    <tr>
        <td>Mehdi Kahouache</td>
        <td>Product Owner</td>
        <td>
          Manage requirements
          Discuss project requirements with client
        </td>
    </tr>
</table>

<br>

### Project Approach

We are favoring technologies and methods that are widely supported, and easy to learn and use.
Following agile practices, the project will be separated into 4 sprints. One meeting per week to discuss current tasks and plan & estimate the following sprints tasks. Although the entire team will be involved in programming, work will be divided between managing sprints, meetings, and dev work for the different components: design and implementation of UI, API, server, client, and database.

## Evaluation of Tech Stack

### Built with

|       |                                                  |
| :---: | :----------------------------------------------: |
| Back-end  | [![Node][node-shield]][node-url]    |
| Front-end | [![React][react-shield]][react-url]  |
| Database | [![MySQL][mysql-shield]][mysql-url] |
| Framework | [![Express JS][express-shield]][express-url] |
| UI Design | [![Figma][figma-shield]][figma-url] |


<br><be>

### FrontEnd

React (:white_check_mark:):

- Familiarity (Uses js)
- Extensively used in the industry
- Looks good on CV
- Many tools and resources

Vue:

- Smaller ecosystem
- Less community support
- Not as used in the industry


Angular:

- Performance overhead
- Relies on Typescript (unfamiliar)
- Steep learning curve
- Boilerplate code

### BackEnd

Node.js (:white_check_mark:):

- Familiarity (Uses JavaScript)
- Extensively used in the industry for building scalable and fast server-side applications
- Great for real-time applications and microservices
- Vast ecosystem with many packages and libraries
- Non-blocking, event-driven architecture for high concurrency

Django:

- Steeper Learning Curve (especially for non-Python developers)
- Conventions can be restrictive for highly customized projects
- Performance may not be suitable for high-speed or real-time applications

Ruby on Rails:

- Performance can be slower compared to Node.js
- Resource-Intensive, potentially leading to higher hosting costs
- Dependency Management can be complex
- Limited Scalability for extremely large applications

### Database

MySQL - SQL (:white_check_mark:):

- Familiarity (used in a previous course)
- Easy to use for beginners
- Known for its speed and can perform well in read-heavy workloads, making it ideal for applications with a focus on fast data retrieval

PostgreSQL - SQL:

- Good for its ability to handle complex queries
- Complex for beginners
- Slower than MySQL
- Resource-intensive, when handling complex queries or large datasets, it may require more memory and CPU resources

MongoDB - NoSQL:

- Document-oriented database
- High memory usage
- Does not support traditional SQL joins
- Unfamiliarity

---

## Getting Started

### Dependencies

1. Install Nodejs and NPM
   - For reference, please visit the official ***[NodeJS installation Guide][nodejs-install-url]***
2. Install MySQL ***[MySQL Installation Guide][mysql-install-url]***

### Setup

#### Clone the repo
```sh
# clone repo into folder "project"
git clone git@github.com:CedricLimAhTock/0verdrive-soen341projectF2023.git project
```

##### Create database
```sh
# navigate to directory with the SQL files and
# create the database from your terminal

cd /<your-path>/project/database
mysql -u root -p < lorem.sql
```
##### Import data into tables

```sh
# TODO: install python3-pip if not installed
pip3 install mysql-connector-python
chmod +x populate_tables.py
python3 populate_tables.py
```

<br>

## Usage

1. Ensure ***Dependencies*** are installed.
2. In the ```client``` folder run:

    ```sh
    npm install
    npm run dev
    ```

3. In the ```server``` folder run

    ```sh
    npm install
    node server.js
    ```

<br>

### Setting up Monitoring with Graphana 

1. Install docker ***[Docker Install Guide][docker-url]***
2. Open a terminal and navigate to .../\<project\>/server/ directory where the yml files are.
3. Install Prometheus
  ```sh
  docker run --rm -d -p 9090:9090 --name prometheus -v `pwd`/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus:v2.20.1
  ```

4. Configure Graphana :warning: Must use your systems IP

  ```sh
  Edit datasources.yml
  If installed on the same system as your host, use the local host ip.
  Set the "url" value to your local host ip e.g. http://192.168.0.10:9090
  NOT "localhost" / "127.0.0.1" or other loopback addresses.
  ```

5. Install And Run Graphana via Docker CLI ***[Graphana Installation Guide][graphana-url]***

  ```sh
  docker volume create grafana-storage
  docker run --rm -d -p 3000:3000 --name=grafana --volume grafana-storage:/var/lib/grafana \
    -e GF_AUTH_DISABLE_LOGIN_FORM=true \
    -e GF_AUTH_ANONYMOUS_ENABLED=true \
    -e GF_AUTH_ANONYMOUS_ORG_ROLE=Admin \
    -v `pwd`/datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml grafana/grafana-enterprise
  ```
6. View Graphana Dashboard <http://localhost:3000/dashboards>
7. Stop Graphana & Prometheus

  ```sh
  docker stop grafana
  docker stop prometheus
  ```

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[react-url]: https://reactjs.org/
[node-shield]: https://img.shields.io/badge/NodeJs-20232A?style=for-the-badge&logo=nodedotjs
[node-url]: https://nodejs.org/
[mysql-url]: https://www.mysql.com/
[express-shield]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express
[express-url]: https://expressjs.com/
[figma-shield]: https://img.shields.io/badge/Figma-20232A?style=for-the-badge&logo=figma
[figma-url]: https://www.figma.com/
[js-shield]: https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript
[js-url]: https://www.javascript.com/
[mysql-shield]: https://img.shields.io/badge/MySQL-20232A?style=for-the-badge&logo=mysql&logoColor=white

[nodejs-install-url]: https://github.com/nodesource/distributions/blob/master/README.md
[mysql-install-url]: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/
[docker-url]: https://docs.docker.com/engine/install
[graphana-url]: https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/
<!-- WIKI refs -->
[wiki-tech-eval-url]: https://github.com/CedricLimAhTock/0verdrive-soen341projectF2023/wiki/Design#evaluation-of-tech-stack
