# Database Backups Guide

Eventually it will happen- you'll delete something you shouldn't have, be the first to run into
a bug, or otherwise wish you could go back in time. As soon as you have a working copy of the app,
you should decide on your backup strategy. MongoDB Atlas provides terminal commands to do this
manually, or you can run them automatically in AWS.

## Manual

Log in to MongoDB Atlas. From the Clusters page, click the "..." button and choose Command Line Tools.
The binary import and export commands `mongodump` and `mongorestore` have invocations listed here
for your currently logged in user. By running these from a terminal, you can back up your database
or restore it. Be advised that you may need to drop your existing collections from the database before
restoring it. Our preferred tool for this is the free version of `NoSQLBooster`, which provides a
GUI for managing data.

You could automate this process locally using `cron`, as well. If you have multiple admins,
consider having each of them do the process occasionally (or storing the snapshots in a location
where your fellow admins can recover them.)

## Automatic

If you have an AWS account, you can use the [tacoman/mongocluster-backup-terraform](https://github.com/tacoman/mongocluster-backup-terraform)
repository to create an automatic backup process. The process is created using a [Terraform](https://www.terraform.io/) module; while
you can run it locally, we recommend that you use a Terraform Cloud account, which is free and makes it easier for your SG
to manage the AWS resources.

To create the backup job, link your GitHub and Terraform Cloud accounts, then fork the repo into your own GitHub.
View `variables.tf` to see which variables need to be set in the Terraform workspace, and then create + apply the
Terraform plan. (Ensure that any sensitive variables such as passwords are marked as such in Terraform to prevent
them from being read by other admins!) You will also need to use environment variables to provide your
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for the AWS IAM user that Terraform will run as.

This process will create a Lambda function to backup your MongoDB cluster to an s3 bucket once a week. Backups are retained
for a year, at which point they expire to save on storage costs. You may edit `main.tf` to adjust these settings,
such as running daily or moving backups to Glacier instead of deleting at the end of the retention period.

The backup process will create a ZIP of `.bson` files. Extract this, then use a `mongorestore` command such as the following
to restore the database:

`mongorestore --host hymnal-shard-0/hymnal-shard-00-00-6l9mu.mongodb.net:27017,hymnal-shard-00-01-6l9mu.mongodb.net:27017,hymnal-shard-00-02-6l9mu.mongodb.net:27017 --ssl --username <USERNAME> --password <PASSWORD> --authenticationDatabase admin -d <UNZIPPED DIRECTORY> --dir=<UNZIPPED DIRECTORY>`

You will need to supply your own credentials and substitute your own shard information; these are the same shards you used
to connect to your database.

We recommend that you create separate AWS IAM users for each administrator to allow them to access the s3 bucket and restore
the backups in case of an emergency. Full administration of an AWS account such as least privilege, IAM policies,
etc. is considered out of scope of this guide.