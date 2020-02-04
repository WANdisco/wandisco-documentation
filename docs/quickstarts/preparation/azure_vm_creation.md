---
id: azure_vm_creation
title: Creating an Azure Linux VM for a Fusion installation
sidebar_label: Azure VM creation
---

This quickstart helps you create an Azure Linux VM suitable for a Fusion installation. It walks you through:

* Creating an [Azure Linux VM template](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/create-ssh-secured-vm-from-template) script.
* Creating a [cloud-init](https://cloudinit.readthedocs.io/en/latest/topics/examples.html) template to initialise the VM.
* How to use the Azure Linux VM template script.
  * Logging in to the VM for the first time.

## Prerequisites

* [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) with the ability to run `az login` on your terminal.

### SSH keys

SSH keys will be generated as part of the VM creation process.
See the Microsoft documentation for further details - [Linux or macOS](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys) or [Windows](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/ssh-from-windows).

If you already have keys in the default location(s), these keys will be used with the Azure VM and will not be overwritten.

## Create templates

The two required templates are given below. Create these in the same location with the names given.

1. `create_docker_vm.sh` - this contains the template options required for the VM.

   ```bash
   #!/usr/bin/env bash
   set -e

   GROUP=''
   RG=''
   VNET=''
   VM_NAME=''
   ADMIN_USERNAME=''
   TYPE=''
   DISK=''
   IMAGE=''

   print_usage() {
     echo "Usage: ./create_docker_vm.sh -g AZ-USER-GROUP -r AZ-RESOURCE-GROUP -v AZ-VNET -s AZ-SUBNET-NAME -n VM-NAME -u VM-USERNAME -t VM-TYPE -d VM-DISK-SIZE (GB) -i OPERATING-SYSTEM"

     echo "Example: ./create_docker_vm.sh -g DEV -r DEV-john.smith1 -v DEV-westeurope-vnet -s default -n johnsmith-docker -u john -t Standard_D4_v3 -d 32 -i UbuntuLTS"
   }
   #Setup of env
   while getopts "g:G:r:R:v:V:s:S:n:N:u:U:t:T:d:D:i:I:h:H:" opt; do
     case $opt in
       g|G) GROUP="${OPTARG}" ;;
       r|R) RG="${OPTARG}" ;;
       v|V) VNET="${OPTARG}" ;;
       s|S) SUBNAME="${OPTARG}" ;;
       n|N) VM_NAME="${OPTARG}" ;;
       u|U) VM_USERNAME="${OPTARG}" ;;
       t|T) TYPE=${OPTARG} ;;
       d|D) DISK=${OPTARG} ;;
       i|I) IMAGE=${OPTARG} ;;
       h|H) print_usage exit 1;;
       *) print_usage
          exit 1 ;;
     esac
   done

   #VM Characteristics
   SUBNETID=$(az network vnet subnet show -g $GROUP -n $SUBNAME --vnet-name $VNET --output tsv --query 'id')
   [ -n "$SUBNETID" ]

   echo "Parameters"
   echo "Group: $GROUP"
   echo "Resource Group: $RG"
   echo "VNET: $VNET"
   echo "Subnet Name: $SUBNAME"
   echo "VM Name: $VM_NAME"
   echo "VM Username: $VM_USERNAME"
   echo "VM Type: $TYPE"
   echo "Disk Size: $DISK GB"
   echo "Image (OS): $IMAGE"
   echo "Subnet ID: $SUBNETID"

   az vm create \
       --resource-group $RG \
       --name $VM_NAME \
       --image $IMAGE \
       --size $TYPE \
       --admin-username $VM_USERNAME \
       --generate-ssh-keys \
       --storage-sku Standard_LRS \
       --os-disk-size-gb $DISK \
       --custom-data cloud-init.txt \
       --subnet $SUBNETID \
       --public-ip-address ""
   ```

2. `cloud-init.txt` - contains initialisation settings for the VM.

   ```text
   #cloud-config

   package_update: true

   disk_setup:
       ephemeral0:
           table_type: mbr
           layout: [66, [33, 82]]
           overwrite: True
   fs_setup:
       - device: ephemeral0.1
         filesystem: ext4
       - device: ephemeral0.2
         filesystem: swap
   mounts:
       - ["ephemeral0.1", "/var/lib/docker"]
       - ["ephemeral0.2", "none", "swap", "sw", "0", "0"]

   apt:
     sources:
       source1:
         source: "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
         key: |
           -----BEGIN PGP PUBLIC KEY BLOCK-----

           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
           YT90qFF93M3v01BbxP+EIY2/9tiIPbrd
           =0YYh
           -----END PGP PUBLIC KEY BLOCK-----

   packages:
     - apt-transport-https
     - ca-certificates
     - curl
     - gnupg-agent
     - software-properties-common
     - docker-ce
     - docker-ce-cli
     - containerd.io

   runcmd:
     - [ cloud-init-per, once, fetch_docker_compose, curl, -L,
       "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-Linux-x86_64",
       -o, /usr/local/bin/docker-compose ]
     - [ cloud-init-per, once, docker_compose_perms,
       chmod, +x, /usr/local/bin/docker-compose ]

   system_info:
       default_user:
           groups: [docker]
   ```

## Use the Azure template script to create the VM

1. Collect all required variables before running the script.

   |Variable|Flag|Example|Description|
   |---|---|---|---|
   |Group|`-g`|`GRP`|The [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis) group to use. **Must already exist**.|
   |Resource Group|`-r`|`GRP-my.name1`|The [Azure Resource group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview#resource-groups) to use. **Must already exist**.|
   |VNET|`-v`|`GRP-westeurope-vnet`|The [Azure Virtual Network](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview) to use. **Must already exist**.|
   |Subnet Name|`-s`|`default`|The Azure Virtual Network [Subnet name](https://docs.microsoft.com/en-us/cli/azure/network/vnet/subnet?view=azure-cli-latest). **Must already exist**.|
   |VM Name|`-n`|`docker_host01`|Define the Virtual Machine name in Azure.|
   |VM Username|`-u`|`vm_user`|Define the username to access the Virtual Machine with.|
   |[VM Type](https://docs.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest#az-vm-list-sizes)|`-t`|`Standard_D8_v3`|Define the Virtual Machine size from the [Azure templates](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes). The `name` value from `az vm list-sizes --location <vm_location>` should be the value here.|
   |Disk Size|`-d`|`32`|Define the disk space on the Virtual Machine in GigaBytes (GB).|
   |[Image (OS)](https://docs.microsoft.com/en-us/cli/azure/vm/image?view=azure-cli-latest#az-vm-image-list)|`-i`|`UbuntuLTS`|Define the Virtual Machine's Operating System from the [Azure images](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/cli-ps-findimage). The `urnAlias` value from `az vm image list [--all] [--location]` should be the value here.|

2. Make the script executable.

   `chmod +x create_docker_vm.sh`

3. Run the script using the variables collected above.

   `./create_docker_vm.sh -g GRP -r GRP-my.name1 -v GRP-westeurope-vnet -s default -n docker_host01 -u vm_user -t Standard_D8_v3 -d 32 -i UbuntuLTS`

   _Example output_

   ```text
   Parameters
   Group: GRP
   Resource Group: GRP-my.name1
   VNET: GRP-westeurope-vnet
   Subnet Name: default
   VM Name: docker_host01
   VM Username: vm_user
   VM Type: Standard_D8_v3
   Disk Size: 32 GB
   Image (OS): UbuntuLTS
   Subnet ID: /subscriptions/3842fefa-7697-4e7d-b051-a5a3ae601030/resourceGroups/GRP/providers/Microsoft.Network/virtualNetworks/GRP-westeurope-vnet/subnets/default
   {
     "fqdns": "",
     "id": "/subscriptions/3842fefa-7697-4e7d-b051-a5a3ae601030/resourceGroups/GRP-my.name1/providers/Microsoft.Compute/virtualMachines/docker_host01",
     "location": "westeurope",
     "macAddress": "00-0D-3A-3A-9D-52",
     "powerState": "VM running",
     "privateIpAddress": "172.10.1.10",
     "publicIpAddress": "",
     "resourceGroup": "GRP-my.name1",
     "zones": ""
   }
   ```

You can now log in to your Azure VM, for example `ssh vm_user@172.10.1.10`.

## Next steps

To prepare your VM for a Fusion installation, see the [Azure VM preparation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_prep) guide.
