---
id: azure_vm_creation
title: Creating an Azure Linux Virtual Machine for a Fusion installation
sidebar_label: Azure VM Creation
---

This quickstart helps you create an Azure Linux Virtual Machine (VM) suitable for a Fusion installation. It walks you through:

* Downloading a [cloud-init](https://cloudinit.readthedocs.io/en/latest/topics/examples.html) template to initialise the VM and install required services.
* Obtaining [Azure parameters](https://docs.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest#az-vm-create) to create the VM.
* Creating the [Linux VM with the Azure CLI](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/create-cli-complete).
  * Logging in to the VM for the first time.

## Prerequisites

* [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) with the ability to run `az login` on your terminal.

### SSH keys

There is an option to use SSH keys as part of the VM creation process. See the Microsoft documentation for further details:

* [Linux or macOS](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys)
* [Windows](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/ssh-from-windows)

## Download the cloud-init template

Download this file to the same location you will run the Azure CLI:

<a id="cloud-init.txt" href="https://github.com/WANdisco/wandisco-documentation/raw/master/docs/assets/cloud-init.txt">cloud-init.txt</a> _- Right-click and Save link as 'cloud-init.txt'._

The template contains initialization parameters for the VM, and pre-installs the required services.

## Required parameters

The variables required to create a suitable VM are:

* The name for the VM (user defined).

  _Example:_ `--name docker_host01`

* The [Azure Resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az-group-list) to use for the VM. _Must already exist_.

  Use the `name` value from `az group list --output table`.

  _Example:_ `--resource-group GRP-my.name1`

* The admin username to log in to the VM with (user defined).

  _Example:_ `--admin-username vm_user`

* The VM size from the [Azure templates](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes).

  Use the `name` value from `az vm list-sizes --location <vm-location> --output table`.

  _Example:_ `--size Standard_D4_v3`

* The storage [SKU type](https://docs.microsoft.com/en-us/rest/api/storagerp/srp_sku_types) to use.

  _Example:_ `--storage-sku Standard_LRS`

* The [image (operating system)](https://docs.microsoft.com/en-us/cli/azure/vm/image?view=azure-cli-latest#az-vm-image-list).

  Use the `urnAlias` value from `az vm image list --location <vm-location> --output table`.

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

  You first need a virtual network (VNet) and its subnet name. Using these, you can get the subnet ID.

  1. To get a list of VNets available to your account, use:

     `az resource list --location <vm-location> --query "[?type=='Microsoft.Network/virtualNetworks'].{VNetName:name, ResourceGroup:resourceGroup}" --output table`

  1. The **VNetName** and **ResourceGroup** can then be used to list your VNet subnets:

     `az network vnet subnet list --vnet-name <vnet-name> -g <vnet-resource-group> --output table`

     The subnet names are listed in the **Name** column.

  1. Now get the subnet ID by using the **VNetName**, **ResourceGroup** and subnet **Name** in the following command:

     `az network vnet subnet show --vnet-name <vnet-name> -g <vnet-resource-group> -n <subnet-name>  --output tsv --query 'id'`

     Use the output of this last step for the subnet parameter.

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
