import React, {Component} from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';


class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
      const { activities } = this.props
      this.setState({
          activities: activities
      })
  }

  //TODO: fxn that takes all dates on props and creates <tr> for each
  //TODO: btn that lets admin accept or reject date submission
  //TODO: fxn that processes accept or reject btn click and changes the date in the database to reflect (needs to actively change the FE as well & log admin modified)
  //TODO: have to handle image sizing and preview, size of description as well

  //NOTE: would be nice to log ALL date history until date is deleted from the system by an admin permanently.
  //NOTE: Date status's: Needs Approval, Approved, Needs Review (for questionable ones), Rejected, Deleted (for one's with 0 value)


  render() {
    return (<div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h2>Great Date Submissions</h2>
            </CardHeader>
            <CardBody>
              <Table hover="hover" bordered="bordered" striped="striped" responsive="responsive" size="lg">
                <thead>
                  <tr>
                    <th>Date Title</th>
                    <th>Description</th>
                    <th>Cost</th>
                    <th>Image</th>
                    <th>Created On</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Last Modified</th>
                    <th>Admin Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>'"The Local" Bike Ride Along Mission Bay'</td>
                    <td>"Rent Bikes at the nearby Pacific Beach Bike shop (1277 Garnet Ave) before heading down to Mission Bay."</td>
                    <td>.33</td>
                    <td></td>
                    <td>05/15/2018</td>
                    <td></td>
                    <td>
                      <Badge color="success">Approved</Badge>
                    </td>
                    <td></td>

                    <td></td>
                  </tr>
                  <tr>
                    <td>Zbyněk Phoibos</td>
                    <td>Staff</td>
                    <td>.33</td>
                    <td></td>
                    <td>05/15/2018</td>
                    <td></td>
                    <td>
                      <Badge color="danger">Rejected</Badge>
                    </td>
                    <td></td>

                    <td></td>
                  </tr>
                  <tr>
                    <td>Einar Randall</td>
                    <td>Admin</td>
                    <td>.33</td>
                    <td></td>
                    <td>05/15/2018</td>
                    <td></td>
                    <td>
                      <Badge color="secondary">Needs Approval</Badge>
                    </td>
                    <td></td>

                    <td></td>
                  </tr>
                </tbody>
              </Table>
              <nav>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous="previous" href="#">Prev</PaginationLink>
                  </PaginationItem>
                  <PaginationItem active="active">
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next="next" href="#">Next</PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>)
  }
}

export default Tables;
