local java = ImportPackage("java");

AddFunctionExport("GetAdminLevel", function(player)
    return java.GetAdminLevel(player)
end)

AddFunctionExport("GetAccount", function(player)
    local account = java.GetAccount(player)
    if(account == nil) then
        return nil
    end
    return jsondecode(account)
end)

AddFunctionExport("AddAmbiantSound", function(name, fileName, x,y,z, radius, volume)
    java.AddAmbiantSound(name, fileName, x,y,z, radius, volume)
end)
