# font-detective-aws-setup

To install font-detective you will need to use the included template with CloudFormation. Before you begin, you will need to fulfil the requirements, described below.

Requirements
------------

* A VPC with a CIDR block of `172.31.0.0/16`
* An AMI installed with `font-detective-ws`

Installation
------------

You're ready to rock and roll! Point your browser at [CloudFormation](https://aws.amazon.com/cloudformation/) and select "Upload template to Amazon S3". Now, fill in the parameters and let it churn for a few minutes, creating your cloud infrastructure.

![Parameters doing there thing](http://i.imgur.com/2QycHlL.png)

You'll also need to set up your DynamoDB database. To do this, run the node script in the `db` directory by typing `npm create`.
