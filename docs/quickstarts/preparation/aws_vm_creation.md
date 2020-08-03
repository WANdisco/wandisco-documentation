---
id: aws_vm_creation
title: Creating an Amazon Web Services Linux VM for a LiveData Plane installation
sidebar_label: AWS VM Creation
---

Create an Amazon Web Services Linux VM (EC2 instance) suitable for a Dockerized LiveData Plane installation:

* Download a [cloud-init](https://cloudinit.readthedocs.io/en/latest/topics/examples.html) template to initialize the VM and install required services.
* Obtain [AWS parameters](https://docs.aws.amazon.com/cli/latest/reference/ec2/run-instances.html) to create the VM.
* Create the [Linux VM using the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-ec2-instances.html#launching-instances).
  * Log in to the VM for the first time.

:::note
Check the [Requirements](./dockerized-fusion-requirements.md#host-specifications) section to ensure your VM meets the minimum specification for your chosen installation guide.
:::

## Prerequisites

* AWS CLI [installed](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

### SSH keys

You will need to use SSH keys as part of the VM creation process. See the Amazon documentation for further details:

[Amazon EC2 key pairs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair)

## Download the cloud-init template

Save this file to the same location you will run the AWS CLI:

<a id="cloud-init-ec2.txt" href="https://github.com/WANdisco/wandisco-documentation/raw/master/docs/assets/cloud-init-ec2.txt">cloud-init-ec2.txt</a>

The template contains initialization parameters for the VM, and pre-installs the required services.

_This file has been configured to work with an Ubuntu LTS image._

## Required AWS parameters

The variables required to create a suitable VM are:

* The [AMI ID](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html), which defines the operating system and configuration of the VM.

  _Use an Ubuntu LTS image to ensure compatibility with the cloud-init template._

  See the [Ubuntu AMI Locator](https://cloud-images.ubuntu.com/locator/ec2/) for a list of IDs. We recommend using the current Amazon quickstart AMI ID for Ubuntu 18.04 LTS (`ami-07ebfd5b3428b6f4d`).

  _Example:_ `--image-id ami-07ebfd5b3428b6f4d`

* The number of VMs to create.

  _Example:_ `--count 1`

* The instance type from the [AWS templates](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html).

  Use the `InstanceType` value from `aws ec2 describe-instance-types --output table`. Use `aws ec2 describe-instance-type-offerings` to list available instance types in your configured region.

  If you are intending to replicate large amounts of data (e.g. over 10GB), use a greater instance type.

  _Example:_ `--instance-type r5.xlarge`

* The [Block Device settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-ec2-instances.html#block-device-mapping).

  We recommend a minimum of 32 GB for the root device volume as the `/var/lib/docker` directory will need to store large images.

  If you are intending to replicate large amounts of data (e.g. over 10GB), increase this value accordingly.

  _Example:_ `--block-device-mappings "[{\"DeviceName\":\"/dev/sda1\",\"Ebs\":{\"VolumeSize\":32,\"DeleteOnTermination\":true}}]"`

* The [SSH key pair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) to use for the VM.

  Use the `KeyName` value from `aws ec2 describe-key-pairs --output table`.

  _Example:_ `--key-name MyKeyPair`

  See the link in the [SSH keys](#ssh-keys) section for more info.

* The [Subnet](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html#vpc-subnet-basics) of the Virtual Private Cloud (VPC) to use for the VM. The subnet must belong to the same network as your chosen security group.

  Here are two options on how to get the `SubnetId` value needed:

  * Use `aws ec2 describe-subnets --output table` to list all available subnets in your configured region.

  * Use `aws ec2 describe-subnets --output table --filters "Name=vpc-id,Values=vpc-id-value"` to list subnets in a specific VPC.

    To get a list of available VPCs in your configured region, run:

    `aws ec2 describe-vpcs --output table`

    Replace `vpc-id-value` with the `VpcId` value in the command shown above.

  _Example:_ `--subnet-id subnet-6d8i789e`

  If not specified, your [default VPC/subnet](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html#view-default-vpc) is used.

* The [Security Group](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html) to use. The security group must belong to the same network as your chosen subnet.

  Here are two options on how to get the `GroupId` value needed:

  * Use `aws ec2 describe-security-groups --output table` to list all available security groups in your configured region.

  * Use `aws ec2 describe-security-groups --output table --filters "Name=vpc-id,Values=vpc-id-value"` to list security groups that were created with the specified VPC.

    To get a list of available VPCs in your configured region, run:

    `aws ec2 describe-vpcs --output table`

    Replace `vpc-id-value` with the `VpcId` value in the command shown above.

  _Example:_ `--security-group-ids sg-038uiocgh67f052r5`

  If not specified, your [default security group](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#DefaultSecurityGroup) is used.

### Optional parameters

* Use a private IP address for the VM.

  Prevent a public IP address from being generated by using this option.

  _Example:_ `--no-associate-public-ip-address`

* Enable [EBS optimization](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html).

  Some instance types are [EBS optimized by default](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html#ebs-optimization-support), otherwise specify this option to enable it.

  _Example:_ `--ebs-optimized`

* Assign a [tag](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html) to the VM and/or Volume.

  You can assign tags to both the VM and Volume in AWS in order to help identify and manage them.

  1. _Example for VM tag:_ `--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyVMName}]'`
  1. _Example for Volume tag:_ `--tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=MyVolName}]'`
  1. _Example for VM & Volume tag:_ `--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyVMName}]' 'ResourceType=volume,Tags=[{Key=Name,Value=MyVolName}]'`

## Create the VM

Create the VM using the information collected above. You must also include the `--user-data` parameter to reference the `cloud-init-ec2.txt` template created earlier.

_Example usage_

```bash
aws ec2 run-instances \
--user-data file://cloud-init-ec2.txt \
--image-id ami-07ebfd5b3428b6f4d \
--count 1 \
--instance-type r5.xlarge \
--block-device-mappings "[{\"DeviceName\":\"/dev/sda1\",\"Ebs\":{\"VolumeSize\":32,\"DeleteOnTermination\":false}}]" \
--key-name MyKeyPair \
--subnet-id subnet-6d8i789e \
--security-group-ids sg-038uiocgh67f052r5 \
--no-associate-public-ip-address \
--ebs-optimized \
--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyVMName}]' 'ResourceType=volume,Tags=[{Key=Name,Value=MyVolName}]'
```

_Example output_

```json
{
    "Groups": [],
    "Instances": [
        {
            "AmiLaunchIndex": 0,
            "ImageId": "ami-07ebfd5b3428b6f4d",
            "InstanceId": "i-0ffe1fc1oi7552c56",
            "InstanceType": "r5.xlarge",
            "KeyName": "MyKeyPair",
            "LaunchTime": "2020-04-17T08:36:00+00:00",
            "Monitoring": {
                "State": "disabled"
            },
            "Placement": {
                "AvailabilityZone": "us-east-1a",
                "GroupName": "",
                "Tenancy": "default"
            },
            "PrivateDnsName": "ip-172-30-54-79.ec2.internal",
            "PrivateIpAddress": "172.30.54.79",
            "ProductCodes": [],
            "PublicDnsName": "",
            "State": {
                "Code": 0,
                "Name": "pending"
            },
            "StateTransitionReason": "",
            "SubnetId": "subnet-6d8i789e",
            "VpcId": "vpc-2egd265b",
            "Architecture": "x86_64",
            "BlockDeviceMappings": [],
            "ClientToken": "",
            "EbsOptimized": true,
            "Hypervisor": "xen",
            "NetworkInterfaces": [
                {
                    "Attachment": {
                        "AttachTime": "2020-04-17T08:36:00+00:00",
                        "AttachmentId": "eni-attach-052289f29141a33b3",
                        "DeleteOnTermination": true,
                        "DeviceIndex": 0,
                        "Status": "attaching"
                    },
                    "Description": "",
                    "Groups": [
                        {
                            "GroupName": "default",
                            "GroupId": "sg-038uiocgh67f052r5"
                        }
                    ],
                    "Ipv6Addresses": [],
                    "MacAddress": "13:7f:33:d7:8e:4e",
                    "NetworkInterfaceId": "eni-04b73083da1b86yu7",
                    "OwnerId": "187407821311",
                    "PrivateDnsName": "ip-172-30-54-79.ec2.internal",
                    "PrivateIpAddress": "172.30.54.79",
                    "PrivateIpAddresses": [
                        {
                            "Primary": true,
                            "PrivateDnsName": "ip-172-30-54-79.ec2.internal",
                            "PrivateIpAddress": "172.30.54.79"
                        }
                    ],
                    "SourceDestCheck": true,
                    "Status": "in-use",
                    "SubnetId": "subnet-6d8i789e",
                    "VpcId": "vpc-2egd265b",
                    "InterfaceType": "interface"
                }
            ],
            "RootDeviceName": "/dev/sda1",
            "RootDeviceType": "ebs",
            "SecurityGroups": [
                {
                    "GroupName": "default",
                    "GroupId": "sg-038uiocgh67f052r5"
                }
            ],
            "SourceDestCheck": true,
            "StateReason": {
                "Code": "pending",
                "Message": "pending"
            },
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "MyVMName"
                }
            ],
            "VirtualizationType": "hvm",
            "CpuOptions": {
                "CoreCount": 2,
                "ThreadsPerCore": 2
            },
            "CapacityReservationSpecification": {
                "CapacityReservationPreference": "open"
            },
            "MetadataOptions": {
                "State": "pending",
                "HttpTokens": "optional",
                "HttpPutResponseHopLimit": 1,
                "HttpEndpoint": "enabled"
            }
        }
    ],
    "OwnerId": "187407821311",
    "ReservationId": "r-131175b29d6789eaa"
}
```

You can now log in to your VM, for example `ssh ubuntu@ip-172-30-54-79.ec2.internal`.

##  References

* [AWS parameters for VM creation](https://docs.aws.amazon.com/cli/latest/reference/ec2/run-instances.html)
