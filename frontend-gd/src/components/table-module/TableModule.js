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
import "./table-module.css";


class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
		filters: {
		}
    }
  }

  componentWillMount() {
      const { activities } = this.props
      this.setState({
          activities: activities
      })
  }


  //TODO: btn that lets admin change date approval status
  //TODO: fxn that processes status change btn click and changes the date in the database to reflect (needs to actively change the FE as well & log admin modified)

  //NOTE: would be nice to log ALL date history until date is deleted from the system by an admin permanently.
  //NOTE: Date status's: "pendingApproval", "approved", "pendingReview" (for questionable ones), "rejected", "deleted" (for one's with 0 value)


  getTableHeaders() {

    // const headers = [
    //   "Date Title",
    //   "Description",
    //   "Cost",
    //   "Image",
    //   "Created On",
    //   "Status",
    //   "Last Modified",
    //   "Admin Modified"
    // ]

      return [
        <thead className="headers admin-table-body">
          <tr>
            <th>Date Title</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Image</th>
            <th>Created On</th>
            <th>Status</th>
            <th>Last Modified</th>
            <th>Admin Modified</th>
          </tr>
        </thead>
      ]
  }


// TODO: need to come back to this once i have the BE routes and DB fields figured out
  getTableRows(dateData) {
    return dateData.map((date) => {
      return(
        <tr key={date.id}>
          <td>{date.title}</td>
          <td>{date.description}</td>
          <td>{date.cost}</td>
          {/* <td>image goes here</td> */}
          <td><img src={date.imageName} alt={date.title} style={{width: "100px"}}/></td>
          <td>{date.createdAt}</td>
        <td><Badge color="success">{date.status.toUpperCase()}</Badge></td>
          <td>{date.updatedAt}</td>
          <td>Jordan</td>
        </tr>
    )
    })
  }



  render() {
    console.log("this.state",this.state);

    return (<div className="animated fadeIn admin-table">
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Table className="admin-" bordered responsive>

              {this.getTableHeaders()}

                <tbody className="admin-table-body">

                  {this.getTableRows(this.state.activities)}

                </tbody>
              </Table>


              <nav>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous href="#">Prev</PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
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
                    <PaginationLink next href="#">Next</PaginationLink>
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
