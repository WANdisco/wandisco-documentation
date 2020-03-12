---
id: azure_vm_creation
title: Creating an Azure Linux Virtual Machine for a Fusion installation
sidebar_label: Azure VM creation
---

This quickstart helps you create an Azure Linux Virtual Machine (VM) suitable for a Fusion installation. It walks you through:

* Creating a [cloud-init](https://cloudinit.readthedocs.io/en/latest/topics/examples.html) template to initialise the VM and install required services.
* Obtaining [Azure parameters](https://docs.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest#az-vm-create) to create the VM.
* Creating the [Linux VM with the Azure CLI](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/create-cli-complete).
  * Logging in to the VM for the first time.

## Prerequisites

* [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) with the ability to run `az login` on your terminal.

### SSH keys

There will be an option to use SSH keys as part of the VM creation process. See the Microsoft documentation for further details:

* [Linux or macOS](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys)
* [Windows](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/ssh-from-windows)

## Create the cloud-init template

Create this file with the name given in the same location you will run the Azure CLI:

`cloud-init.txt`

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
       - ["ephemeral0.1", "/mnt"]
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

This template contains initialisation parameters for the VM, and pre-installs the required services.

## Required parameters

The variables required to create a suitable VM are:

* The name for the VM.

  _Example:_ `--name docker_host01`

* The [Azure Resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az-group-list) to use for the VM. _Must already exist_.

  The `name` value from `az group list --output table` should be used here.

  _Example:_ `--resource-group GRP-my.name1`

* The admin username to log in to the VM with.

  _Example:_ `--admin-username vm_user`

* The VM size from the [Azure templates](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes).

  The `name` value from `az vm list-sizes --location <vm-location> --output table` should be used here.

  _Example:_ `--size Standard_D4_v3`

* The storage [SKU type](https://docs.microsoft.com/en-us/rest/api/storagerp/srp_sku_types) to use.

  _Example:_ `--storage-sku Standard_LRS`

* The [image (operating system)](https://docs.microsoft.com/en-us/cli/azure/vm/image?view=azure-cli-latest#az-vm-image-list).

  The `urnAlias` value from `az vm image list --location <vm-location> --output table` should be used here.

  _Example:_ `--image UbuntuLTS`

* The operating system's disk size (in GB).

  We recommend a minimum of 32 GB as the `/var/lib/docker` directory will need to store large images.

  _Example:_ `--os-disk-size-gb 32`

* The authentication type when logging in to the VM.

  You can choose an admin password or your local SSH public key, or you can choose both.

  1. _Example:_ `--authentication-type ssh --ssh-key-values ~/.ssh/id_rsa.pub`
  1. _Example:_ `--authentication-type password --admin-password mypassword`
  1. _Example:_ `--authentication-type all --ssh-key-values ~/.ssh/id_rsa.pub --admin-password mypassword`

  Alternatively, choose to generate SSH keys for the VM.

  1. _Example:_ `--authentication-type ssh --generate-ssh-keys`
  1. _Example:_ `--authentication-type all --generate-ssh-keys --admin-password mypassword`

  See the links in the [SSH keys](#ssh-keys) section for more info.

* The [subnet ID](https://docs.microsoft.com/en-us/cli/azure/network/vnet/subnet?view=azure-cli-latest#az-network-vnet-subnet-list) to use for the VM.

  To obtain the subnet id, you will need a virtual network (vnet) and its subnet name.

  To obtain a list of vnets available to your account, use:

  `az resource list --location <vm-location> --query "[?type=='Microsoft.Network/virtualNetworks'].{VNetName:name, ResourceGroup:resourceGroup}" --output table`

  The **VNetName** and **ResourceGroup** can then be used to obtain a list of subnets for your vnet:

  `az network vnet subnet list --vnet-name <vnet-name> -g <vnet-resource-group> --output table`

  The subnet names are listed in the **Name** column.

  You can now obtain the subnet ID by using the **VnetName**, **ResourceGroup** and subnet **Name** values in the following command:

  `az network vnet subnet show --vnet-name <vnet-name> -g <vnet-resource-group> -n <subnet-name>  --output tsv --query 'id'`

  The path-style string is then used for the subnet parameter.

  _Example:_  `--subnet /subscriptions/3842fefa-8901-4e7d-c789-a5a3ae567890/resourceGroups/GRP/providers/Microsoft.Network/virtualNetworks/GRP-westeurope-vnet/subnets/default`

### Optional parameters

* The [Azure location](https://docs.microsoft.com/en-us/cli/azure/account?view=azure-cli-latest#az-account-list-locations) for the VM.

  The location will default to the Azure resource group you have selected for the VM. You can change it with this parameter.

  _Example:_ `--location westeurope`

* Use a private IP address for the VM.

  Prevent a public IP address from being generated by setting the parameter value to none.

  _Example:_ `--public-ip-address ""`

## Create the VM

Create the VM using the information collected above. You must also include the `--custom-data` parameter to reference the `cloud-init.txt` template created earlier.

_Example usage_

```bash
az vm create \
--custom-data cloud-init.txt \
--name docker_host01 \
--resource-group GRP-my.name1 \
--admin-username vm_user \
--size Standard_D4_v3 \
--storage-sku Standard_LRS \
--image UbuntuLTS \
--os-disk-size-gb 32 \
--authentication-type ssh --ssh-key-values ~/.ssh/id_rsa.pub \
--subnet /subscriptions/3842fefa-8901-4e7d-c789-a5a3ae567890/resourceGroups/GRP/providers/Microsoft.Network/virtualNetworks/GRP-westeurope-vnet/subnets/default \
--location westeurope \
--public-ip-address ""
```

_Example output_

```json
{
  "fqdns": "",
  "id": "/subscriptions/3842fefa-8901-4e7d-c789-a5a3ae567890/resourceGroups/GRP-my.name4/providers/Microsoft.Compute/virtualMachines/docker_host01",
  "location": "westeurope",
  "macAddress": "00-0D-3A-A8-71-A6",
  "powerState": "VM running",
  "privateIpAddress": "172.10.1.10",
  "publicIpAddress": "",
  "resourceGroup": "GRP-my.name4",
  "zones": ""
}
   ```

You can now log in to your Azure VM, for example `ssh vm_user@172.10.1.10`.

##  References

* [Azure parameters for VM creation](https://docs.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest#az-vm-create)
