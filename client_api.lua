WaypointsList = {}
I18N = {}

function OnPackageStart()
    CreateTimer(function()
        UpdateCharacterPositionToUI()
    end, 1000 / 60) 
end
AddEvent("OnPackageStart", OnPackageStart)

AddEvent("OnPlayerStartEnterVehicle", function(vehicleId, seatId)
    if GetVehiclePropertyValue(vehicleId, "locked") == 1 then
        SendLocalToast("error", GetI18NText("action.vehicle.locked"))
        return false 
    end
    if GetPlayerPropertyValue(GetPlayerId(), "wearId") ~= nil and GetPlayerPropertyValue(GetPlayerId(), "wearId") ~= "" then
        SendLocalToast("error", GetI18NText("action.vehicle.wearSomething"))
        return false
    end
end)

AddEvent("OnPickupStreamIn", function(pickup)
	local color = GetPickupPropertyValue(pickup, "color")
	if color ~= nil and color ~= "" then
		SetPickupColor(pickup, color)
	end
end)

AddEvent("OnNPCStreamIn", function(npc)
    if GetNPCPropertyValue(npc, "clothing") ~= nil then
        SetNPCClothingPreset(npc, GetNPCPropertyValue(npc, "clothing"))
    end
end)

function SetPickupColor(pickup, HexColor)
	local color = "0x" .. HexColor
    local StaticMeshComponent = GetPickupStaticMeshComponent(pickup)
    StaticMeshComponent:SetMaterial(0, UMaterialInterface.LoadFromAsset("/Game/Scripting/Materials/MI_TranslucentLit"))
    local MaterialInstance = StaticMeshComponent:CreateDynamicMaterialInstance(0)
    local r, g, b, a = HexToRGBAFloat(color)
    MaterialInstance:SetColorParameter("BaseColor", FLinearColor(r, g, b, 0.4))
end

function SendLocalToast(type, message)
    ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "ADD_TOAST", "notifType": "'..type..'", "message": "'..message..'"})')
end

function PlaySound3D(fileName, x, y, z, radius, volume)
    SetSoundVolume(CreateSound3D(fileName, x, y, z, radius), volume)
end
AddRemoteEvent("Sound:PlaySound3D", PlaySound3D)

function UpdateCharacterPositionToUI()
    local x,y,z = GetPlayerLocation(GetPlayerId())
    local h = GetPlayerHeading(GetPlayerId())
    local _, ch = GetCameraRotation()

    ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "UPDATE_CHARACTER_POSITION", "x": '..x..', "y": '..y..'})')
    ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "UPDATE_CHARACTER_HEADING", "heading": '..h..', "cameraHeading": '..ch..'})')
end

function BlinkVehicleLights(veh)
    SetVehicleLightEnabled(veh, true)
    Delay(300, function ()
        SetVehicleLightEnabled(veh, false)
        Delay(150, function ()
            SetVehicleLightEnabled(veh, true)
            Delay(150, function ()
                SetVehicleLightEnabled(veh, false)
            end)
        end)
    end)
end
AddEvent("BlinkVehicleLights", BlinkVehicleLights)

AddEvent("OnKeyPress", function(key)
    -- Lock toogle vehicle
    if(IsCtrlPressed() and key == "L") then
        CallRemoteEvent("Vehicle:RequestLockToogle")
    end

    -- ShowMap
    if(key == "M") then
        CallRemoteEvent("GlobalUI:ToogleWindow", "bigmap")
    end
end)

AddRemoteEvent("Map:AddWaypoint", function(name, uuid, x,y,z)
    WaypointsList[uuid] = CreateWaypoint(x,y,z, name)
end)

AddRemoteEvent("Map:RemoveWaypoint", function(uuid)
    DestroyWaypoint(WaypointsList[uuid])
end)

function SetCameraAPI(out,height)
	local x,y,z = GetPlayerLocation()
    Delay(100, function()
        SetCameraLocation(x + out,y,z + height,true)
        SetCameraRotation(0,180,0,true)
    end)
end
AddEvent("SetCameraAPI", SetCameraAPI)

function ResetCamera()
	SetCameraLocation(0,0,0,false)
	SetCameraRotation(0,0,0,false)
end
AddEvent("ResetCamera", ResetCamera)

function SetLocalPlayerRotation(pitch, yaw, roll)
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(GetPlayerId(), "Body")
    SkeletalMeshComponent:SetRelativeRotation(FRotator(pitch, yaw, roll))
end
AddEvent("SetLocalPlayerRotation", SetLocalPlayerRotation)

function ResetI18n()
    I18N = {}
end
AddEvent("I18N:Reset", ResetI18n)

function AddKeyValueI18n(key, value)
    I18N[key] = value
end
AddEvent("I18N:AddKeyValue", AddKeyValueI18n)

function GetI18NText(key)
    if(I18N[key] ~= nil) then
        return I18N[key]
    end
    return key
end